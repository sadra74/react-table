import React, {ChangeEvent, Component} from 'react'
import './Table.css';
import axios from 'axios';


class Column {
    title: string | undefined;
    id: string = 'id';
    dataPath: string | undefined;
    width: number | undefined;
    sortable: boolean | undefined;
    filterable: boolean | undefined;
    isSorted?: boolean | undefined;
    isSortedDesc?: boolean | undefined;
}

class Setting {
    isLoading!: boolean;
    data!: Array<any>;
    paginatable!: boolean;
    apiUrl!: string;
    columns!: Array<Column>;
    title!: string;
    load!: Function;
    searchable!: boolean;
    loadOptions!: { filter?: Array<Array<string>>, skip: number, take: number, search?: string, sort?: { name?: string, type?: 'asc' | 'desc' } }
}

class Methods {
    static debounce(func: Function, wait: number, con: any, immediate?: boolean) {
        let timeout: any;
        return function (...values: any) {
            const context = con, args = values;
            const later = function () {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    }
}

export default class Table extends Component<any, {}> {
    constructor(props: any) {
        super(props);
        this.state = {}
        this.callOnceOnSearchChanged = Methods.debounce(this.onSearchChanged, 500, this)
        this.callOnceOnFilter = Methods.debounce(this.onFilterChanged, 500, this)
    }

    setting: Setting = {
        data: [],
        isLoading: false,
        columns: this.props.columns,
        searchable: this.props.searchable,
        paginatable: this.props.paginatable,
        title: this.props.title,
        apiUrl: this.props.apiUrl,
        loadOptions: {
            take: this.props.paginatable ? 5 : 10000000,
            skip: 0
        },
        load: () => {
            this.setting.isLoading = true;
            this.setState({})
            return this.sendRequest();
        }

    };
    callOnceOnSearchChanged;
    callOnceOnFilter


    private sendRequest() {
        return axios.get(
            `https://api.example.com/${this.setting.apiUrl}/`, {
                params: {
                    skip: this.setting.loadOptions.skip,
                    filter: JSON.stringify(this.setting.loadOptions.filter),
                    take: this.setting.loadOptions.take,
                    search: this.setting.loadOptions.search,
                    sort: this.setting.loadOptions.sort,
                }
            }
        ).then((r) => {
            this.setting.data = r.data as Array<any>
        }).catch(r => {
            (new Promise<void>(resolve => setTimeout(resolve, 100))).then((r) => {
                this.afterRequest(r);
            })
        })
    }

    private afterRequest(r: any) {
        this.setting.data = this.props.backend as Array<any>;
        this.setting.data = this.handleDeepMapping()
        this.setting.isLoading = false;
        this.setState({})
    }

    private handleDeepMapping() {
        this.setting.columns.map(co => {
            if (co.dataPath) {
                this.setting.data = this.setting.data.map(row => {
                    if (co.dataPath) {
                        const dataPaths = co.dataPath.split('.');
                        row[co.id] = this.getNext(row, dataPaths)
                    }
                    return row;
                })
            }
        })
        return this.setting.data;
    }

    getNext(obj: any, fields: Array<string>): any {
        const newObj = obj[fields[0]]
        fields.shift();
        if (fields.length > 0) {
            return this.getNext(newObj, fields)
        } else {
            return newObj
        }

    }

    getColumn(id: string): Column {
        return this.setting.columns.find(c => c.id === id) as Column;
    }

    isObject(v: any) {
        return typeof v === 'object' &&
            !Array.isArray(v) &&
            v !== null
    }

    flatten(input: any) {
        return Object.assign(
            {},
            ...function _flatten(o): any {
                return [].concat(...Object.keys(o)
                    .map(k =>
                        typeof o[k] === 'object' ?
                            _flatten(o[k]) :
                            ({[k]: o[k]})
                    )
                );
            }(input)
        )
    }

    sort(col: Column) {
        this.resetSort(col);
        if (col.sortable) {
            if (col.isSorted) {
                if (col.isSortedDesc) {
                    col.isSorted = false;
                    col.isSortedDesc = false;
                } else {
                    col.isSorted = true;
                    col.isSortedDesc = true;
                }
            } else {
                col.isSorted = true;
                col.isSortedDesc = false;
            }
            if (col.isSorted) {
                this.setting.loadOptions.sort = {name: col.id, type: col.isSortedDesc ? 'desc' : 'asc'}
            } else {
                this.setting.loadOptions.sort = {}
            }
            this.setting.load().then(() => {
            })
            this.setState({});
        }

    }

    private resetSort(col: Column) {
        this.setting.columns.forEach(c => {
            if (c.id !== col.id) {
                c.isSorted = false;
                c.isSortedDesc = false;
            }
        })
    }

    filter(col: Column, e: ChangeEvent<HTMLInputElement>) {
        this.callOnceOnFilter(col, e);
    }

    private onFilterChanged(col: Column, e: React.ChangeEvent<HTMLInputElement>) {
        if (!this.setting.loadOptions.filter) {
            this.setting.loadOptions.filter = [];
        } else {
            this.setting.loadOptions.filter = this.setting.loadOptions.filter.filter(f => f[0] !== col.id)
        }
        if (e.target.value) {

            this.setting.loadOptions.filter?.push([col.id, '=', e.target.value]);
            this.setting.load().then(() => {

            })
        } else {
            this.setting.load({}).then(() => {

            })
        }
    }

    search(e: ChangeEvent<HTMLInputElement>) {
        this.callOnceOnSearchChanged(e);
    }

    private onSearchChanged(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value) {
            this.setting.loadOptions.search = e.target.value
            this.setting.load().then(() => {

            })
        } else {
            this.setting.loadOptions.search = undefined
            this.setting.load().then(() => {

            })
        }
    }

    gotoPage(p: number) {
        this.setting.loadOptions.skip = (p - 1) * this.setting.loadOptions.take;
        this.setting.load().then(() => {

        })
        this.setState({})
    }

    componentWillMount() {
        this.setting.load().then(() => {

        })
    }

    render() {
        return (
            <div data-testid="table" className='w-100 h-100 grid columnFlex makeChildCenter'>
                {
                    <div className='w-100 h-100 columnFlex'>
                        <div className='columnFlex cover'>
                            <span data-testid="title" className="title">{this.setting.title}</span>
                            {this.setting.searchable && <input placeholder="SEARCH HERE" onChange={(e) => {
                                this.search(e)
                            }} className="textBox search"/>}</div>
                        <div className="h-100 w-100 overFlowAuto flex1 cover">
                            <table className="w-100">
                                <tbody>
                                <tr className="table header">
                                    {
                                        this.setting.columns.map(col => <th className='column cell header'
                                                                            style={{width: col.width + '%'}}>
                                            <div onClick={() => {
                                                this.sort(col)
                                            }}>
                                                <div className="rowFlex">
                                                    <div className="columnTitle">{col.title}</div>
                                                    <div>
                                                        {col.sortable &&
                                                        <span>{col.isSorted ? col.isSortedDesc ? ' 🔽' : ' 🔼' : ''}</span>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </th>)
                                    }
                                </tr>
                                <tr>{
                                    this.setting.columns.map(col => <td className='column cell filter'
                                                                        style={{width: col.width + '%'}}>
                                        <div style={{minHeight: '20px'}}>
                                            <div style={{display: "flex", flexDirection: "row"}}>
                                                <div className="w-100">
                                                    {col.filterable &&
                                                    <input placeholder="FILTER HERE" style={{height: '100%'}}
                                                           className="textBox"
                                                           onChange={(e) => {
                                                               this.filter(col, e)
                                                           }}/>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </td>)
                                }</tr>
                                {
                                    this.setting.data.map((row, ri) => <tr className="row">
                                        {
                                            this.setting.columns.map((col, ci) =>
                                                <td className='column cell'>
                                                    {row[col.id]}
                                                </td>)
                                        }
                                    </tr>)
                                }
                                </tbody>
                            </table>
                        </div>
                        {this.setting.paginatable && <div className='rowFlex overFlowAuto cover w-100'>
                            {
                                Array.from({length: (this.setting.data.length / this.setting.loadOptions.take) + 1}, (_, i) => i + 1).map(p => {
                                    return <div onClick={() => {
                                        this.gotoPage(p)
                                    }} className="paginateButton cell" style={{
                                        backgroundColor: p === (this.setting.loadOptions.skip / this.setting.loadOptions.take) + 1 ? 'darkgreen' : '',
                                        color: p === (this.setting.loadOptions.skip / this.setting.loadOptions.take) + 1 ? 'white' : ''
                                    }}>{p}</div>
                                })
                            }
                        </div>}
                    </div>
                }
                {this.setting.isLoading && <div className='loader'></div>}
            </div>
        )
    }
}
