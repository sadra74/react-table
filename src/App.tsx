import React, {ChangeEvent, Component} from 'react'
import './App.css';
import axios from 'axios';
import Table from "./Table";


export default class App extends Component<any, {}> {
    constructor(props: any) {
        super(props);
        this.state = {}
    }

    backend1: Array<any> = [
        {
            "name": "Jarvis Randolph",
            "gender": "male",
            "company": "VITRICOMP",
            "email": "jarvisrandolph@vitricomp.com"
        },
        {
            "name": "Bolton Vaughan",
            "gender": "male",
            "company": "APEX",
            "email": "boltonvaughan@apex.com"
        },
        {
            "name": "Karen Bryan",
            "gender": "female",
            "company": "SURETECH",
            "email": "karenbryan@suretech.com"
        },
        {
            "name": "Reva Wheeler",
            "gender": "female",
            "company": "FIBEROX",
            "email": "revawheeler@fiberox.com"
        },
        {
            "name": "Cote Day",
            "gender": "male",
            "company": "COMBOGENE",
            "email": "coteday@combogene.com"
        },
        {
            "name": "Sykes Montoya",
            "gender": "male",
            "company": "ZIALACTIC",
            "email": "sykesmontoya@zialactic.com"
        },
        {
            "name": "Susanne Young",
            "gender": "female",
            "company": "SHOPABOUT",
            "email": "susanneyoung@shopabout.com"
        },
        {
            "name": "Robbins West",
            "gender": "male",
            "company": "OZEAN",
            "email": "robbinswest@ozean.com"
        },
        {
            "name": "Kim Huff",
            "gender": "female",
            "company": "PUSHCART",
            "email": "kimhuff@pushcart.com"
        },
        {
            "name": "Good Christian",
            "gender": "male",
            "company": "LYRIA",
            "email": "goodchristian@lyria.com"
        },
        {
            "name": "Mcneil Mcdowell",
            "gender": "male",
            "company": "ICOLOGY",
            "email": "mcneilmcdowell@icology.com"
        },
        {
            "name": "Underwood Padilla",
            "gender": "male",
            "company": "OPTICON",
            "email": "underwoodpadilla@opticon.com"
        },
        {
            "name": "Marta Harrison",
            "gender": "female",
            "company": "ACUSAGE",
            "email": "martaharrison@acusage.com"
        },
        {
            "name": "Lindsay Medina",
            "gender": "male",
            "company": "UNIWORLD",
            "email": "lindsaymedina@uniworld.com"
        },
        {
            "name": "Knox Pearson",
            "gender": "male",
            "company": "VELITY",
            "email": "knoxpearson@velity.com"
        },
        {
            "name": "Branch Gray",
            "gender": "male",
            "company": "XELEGYL",
            "email": "branchgray@xelegyl.com"
        },
        {
            "name": "Diaz Oneil",
            "gender": "male",
            "company": "EXOSPEED",
            "email": "diazoneil@exospeed.com"
        },
        {
            "name": "Mattie Alexander",
            "gender": "female",
            "company": "LETPRO",
            "email": "mattiealexander@letpro.com"
        },
        {
            "name": "Garza Cantrell",
            "gender": "male",
            "company": "AMTAS",
            "email": "garzacantrell@amtas.com"
        },
        {
            "name": "Henson Castillo",
            "gender": "male",
            "company": "AMTAP",
            "email": "hensoncastillo@amtap.com"
        },
        {
            "name": "Sutton Hahn",
            "gender": "male",
            "company": "FUTURIZE",
            "email": "suttonhahn@futurize.com"
        },
        {
            "name": "Aurelia Patel",
            "gender": "female",
            "company": "PHEAST",
            "email": "aureliapatel@pheast.com"
        },
        {
            "name": "Lori Preston",
            "gender": "female",
            "company": "BULLJUICE",
            "email": "loripreston@bulljuice.com"
        },
        {
            "name": "Latisha Garner",
            "gender": "female",
            "company": "SCENTRIC",
            "email": "latishagarner@scentric.com"
        },
        {
            "name": "Deana Thomas",
            "gender": "female",
            "company": "MAROPTIC",
            "email": "deanathomas@maroptic.com"
        },
        {
            "name": "Sonya Holman",
            "gender": "female",
            "company": "INSURETY",
            "email": "sonyaholman@insurety.com"
        },
        {
            "name": "Love Fischer",
            "gender": "male",
            "company": "BALOOBA",
            "email": "lovefischer@balooba.com"
        },
        {
            "name": "Jillian Woodward",
            "gender": "female",
            "company": "BICOL",
            "email": "jillianwoodward@bicol.com"
        },
        {
            "name": "Joanna Combs",
            "gender": "female",
            "company": "TERRASYS",
            "email": "joannacombs@terrasys.com"
        },
        {
            "name": "Kristine Horton",
            "gender": "female",
            "company": "UPDAT",
            "email": "kristinehorton@updat.com"
        },
        {
            "name": "Gilliam Armstrong",
            "gender": "male",
            "company": "PLASMOS",
            "email": "gilliamarmstrong@plasmos.com"
        },
        {
            "name": "Mejia Alston",
            "gender": "male",
            "company": "INTERLOO",
            "email": "mejiaalston@interloo.com"
        },
    ]
    backend2: Array<any> = [
        {
            "info": {name: "sadra", age: 25}
        },
    ]
    backend3: Array<any> = [
        {
            "age": 37,
            "name": "Tami Allen"
        },
        {
            "age": 37,
            "name": "Martina Warner"
        },
        {
            "age": 23,
            "name": "Matilda Gross"
        },
        {
            "age": 24,
            "name": "Hall Mendoza"
        },
        {
            "age": 25,
            "name": "Monique Odonnell"
        },
        {
            "age": 39,
            "name": "Flores Townsend"
        },
        {
            "age": 30,
            "name": "Carter Best"
        },
        {
            "age": 39,
            "name": "Jessica Mcmillan"
        },
        {
            "age": 21,
            "name": "Lynnette Griffin"
        },
        {
            "age": 40,
            "name": "Neva York"
        },
        {
            "age": 29,
            "name": "Lucas Serrano"
        },
        {
            "age": 21,
            "name": "Lee Hurley"
        },
        {
            "age": 39,
            "name": "Sandra Mercado"
        },
        {
            "age": 25,
            "name": "Earlene Ramsey"
        },
        {
            "age": 20,
            "name": "Katina Conway"
        },
        {
            "age": 32,
            "name": "Snow Stewart"
        },
        {
            "age": 20,
            "name": "Christa Long"
        }
    ]

    columns1 = [
        {
            title: 'Name',
            id: 'name',
            dataPath: '',
            width: 20,
            sortable: true,
            filterable: false,
        },
        {
            title: 'Gender',
            id: 'gender',
            dataPath: '',
            width: 20,
            sortable: true,
            filterable: false,
        },
        {
            title: 'Company',
            id: 'company',
            dataPath: '',
            width: 20,
            sortable: true,
            filterable: false,
        },
        {
            title: 'Email',
            id: 'email',
            dataPath: '',
            width: 40,
            sortable: true,
            filterable: false,
        },


    ]
    columns2 = [
        {
            title: 'Name',
            id: 'name',
            dataPath: 'info.name',
            width: 90,
            sortable: true,
            filterable: true,
        },
        {
            title: 'Age',
            id: 'age',
            dataPath: 'info.age',
            width: 10,
            sortable: true,
            filterable: true
        }
    ]
    columns3 = [
        {
            title: 'Name',
            id: 'name',
            dataPath: '',
            width: 90,
            sortable: false,
            filterable: false,
        }
    ]

    render() {

        return (
            <div>
                <div style={{
                    height: '5vh',
                    backgroundColor: "#004a00",
                    color: "white",
                    textAlign: 'center',
                    fontSize: "15px",
                    opacity: 0.7,
                    justifyContent: "center",
                    alignItems: 'center'
                }}>
                </div>
                <div data-testid="app" style={{height: '90vh'}}>
                    <div className='h-100 w-100 rowFlex'>
                        <div style={{flex: 2, minWidth: 0}} className='h-100 w-100 columnFlex'>
                            <div className='flex1'>
                                <Table
                                    backend={this.backend3}
                                    columns={this.columns3}
                                    title='Customers'
                                    apiUrl='Customers'
                                    paginatable={false}
                                    searchable={false}
                                />
                            </div>
                        </div>
                        <div style={{flex: 5, minWidth: 0}} className='h-100 w-100 columnFlex'>
                            <div className='flex1'>
                                <Table
                                    backend={this.backend2}
                                    columns={this.columns2}
                                    title='Sales Team'
                                    apiUrl='SalesTeam'
                                    paginatable={false}
                                    searchable={false}
                                />
                            </div>
                            <div className='flex1'>
                                <Table
                                    backend={this.backend1}
                                    columns={this.columns1}
                                    title='Users'
                                    apiUrl='Users'
                                    paginatable={true}
                                    searchable={true}
                                /></div>
                        </div>
                        <div style={{flex: 1, minWidth: 0}} className='h-100 w-100 columnFlex'>
                            <div className='flex1'>
                                <Table
                                    backend={this.backend3}
                                    columns={this.columns3}
                                    title='Customers'
                                    apiUrl='Customers'
                                    paginatable={false}
                                    searchable={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{
                    height: '5vh',
                    backgroundColor: "#004a00",
                    color: "white",
                    textAlign: 'center',
                    fontSize: "20px",
                    opacity: 0.7,
                    justifyContent: "center",
                    alignItems: 'center'
                }}>
                </div>

            </div>
        )
    }


}
