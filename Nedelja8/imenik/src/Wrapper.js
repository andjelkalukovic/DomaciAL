import React from 'react'
import Poruka from './Poruka';
import Kontakti from './Kontakti';

class Wrapper extends React.Component{
    constructor (props){
        super (props);
        this.state = {
            ime: '',
            broj: '',
            kontakti: [],
            poruka:'',
           filtriraniC:[]
        }
    }

    handleIme(e){
        this.setState({
            ime: e.target.value
        })
    }

    handleBroj(e){
        this.setState({
            broj: e.target.value
        })
    }

    handleClick(){
        if (this.state.ime.trim()==='' || this.state.broj.trim()===''){
            this.setState({
                poruka: "Грешка"
            })
        }
        else if (!this.state.broj.startsWith('+')){
            this.setState({
                poruka: "Tелефон мора бити унет у формату +ххх ххххххххх"
            })
        }
        else {
            this.setState({
                poruka:''
            })

            if (this.state.kontakti.find(el=>el.ime === this.state.ime)){
                if (window.confirm ("Да ли желите да замените контакт?")){
                    let kontakt = {
                        ime: this.state.ime,
                        broj: this.state.broj
                    }
                    let i= this.state.kontakti.findIndex(el=> el.ime === this.state.ime);
                    this.state.kontakti.splice(i,1,kontakt);
                    this.setState({
                        kontakti:this.state.kontakti,
                        filtriraniC: this.state.kontakti
                    })
                }
                else {return}
                
            } else {
                let kontakt = {
                    ime: this.state.ime,
                    broj: this.state.broj
                }
                this.state.kontakti.push(kontakt);
                this.setState({
                    kontakti:this.state.kontakti,
                        filtriraniC: this.state.kontakti
                })
     } }}

    reset() {
        this.setState({
            ime: '',
            broj: ''
        })
    }

    inputFilter(e){
        let filtrirani= this.state.kontakti.filter((kontakt)=> kontakt.ime.includes(e.target.value));
        this.setState({
            filtriraniC:filtrirani
        })

    }

    render() {
        
        return(
            <>
            <div>
                <input type="text" onChange={(e) => this.handleIme(e)} value={this.state.ime} placeholder="Име и презиме" />
                <input type="text" onChange={(e) => this.handleBroj(e)} value={this.state.broj} placeholder="Број телефона" />
                <button onClick={() =>{ this.handleClick(); this.reset() }}>Додати контакт</button>
            </div>
            <div>
                <Poruka poruka={this.state.poruka}></Poruka>
            </div>
            <div>
                <h4>Листа контакта:</h4>
                <Kontakti kontakti={this.state.kontakti}></Kontakti>
            </div>
            <div>
            <h4>Пронађи контакт:</h4>
            <input type="text" onChange={(e)=> this.inputFilter(e)} placeholder="Пронађи контакт"></input>
            <Kontakti kontakti={this.state.filtriraniC}></Kontakti>
            </div>
            </>
        )
    }
    
}

export default Wrapper;