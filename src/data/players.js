import playerThumb from '../assets/squad-player.png';

const SquadList = {
    players : {
        goalkeepers:[
            {id:'1', name:'Dino Zoff', position:"GK", thumb:playerThumb, selected:false, availability:"player-available", validity:"player-valid"},
            {id:'2', name:'Gordon Banks', position:"GK", thumb:playerThumb, selected:false, availability:"player-available", validity:"player-valid"},
            {id:'3', name:'Manuel Neueur', position:"GK", thumb:playerThumb, selected:false, availability:"player-available", validity:"player-valid"}
        ],
        defenders: [
            {id:'4', name:'Bobby Moore', position:"DEF", thumb:playerThumb, selected:false, availability:"player-available", validity:"player-valid"},
            {id:'5', name:'Franz Beckenbauer',position:"DEF", thumb:playerThumb, selected:false, availability:"player-available", validity:"player-valid"},
            {id:'6', name:'Paolo Maldini',position:"DEF", thumb:playerThumb, selected:false, availability:"player-available", validity:"player-valid"},
            {id:'7', name:'Franco Baresi', position:"DEF",thumb:playerThumb, selected:false, availability:"player-available", validity:"player-valid"},
            {id:'8', name:'Roberto Carlos',position:"DEF", thumb:playerThumb, selected:false, availability:"player-available", validity:"player-valid"},
            {id:'9', name:'Cafu',position:"DEF", thumb:playerThumb, selected:false, availability:"player-available", validity:"player-valid"},
            {id:'10', name:'Phillip Lahm',position:"DEF", thumb:playerThumb, selected:false, availability:"player-available", validity:"player-valid"},
        ],
        midfielders: [
            {id:'11', name:'Diego Maradona',position:"MID", thumb:playerThumb, selected:false, availability:"player-available", validity:"player-valid"},
            {id:'12', name:'Trevor Brooking',position:"MID", thumb:playerThumb, selected:false, availability:"player-available", validity:"player-valid"},
            {id:'13', name:'Cristiano Ronaldo',position:"MID", thumb:playerThumb, selected:false, availability:"player-available", validity:"player-valid"},
            {id:'14', name:'Johanne Cruyff',position:"MID", thumb:playerThumb, selected:false, availability:"player-available", validity:"player-valid"},
            {id:'15', name:'Lionel Messi',position:"MID", thumb:playerThumb, selected:false, availability:"player-available", validity:"player-valid"},
            {id:'16', name:'Xavi',position:"MID", thumb:playerThumb, selected:false, availability:"player-available", validity:"player-valid"},
            {id:'17', name:'Danny Shittu',position:"MID", thumb:playerThumb, selected:false, availability:"player-available", validity:"player-valid"},
        ],
        forwards: [
            {id:'18', name:'Alan Shearer',position:"FWD", thumb:playerThumb, selected:false, availability:"player-available", validity:"player-valid"},
            {id:'19', name:'Gerd Muller',position:"FWD", thumb:playerThumb, selected:false, availability:"player-available", validity:"player-valid"},
            {id:'20', name:'Gary Lineker',position:"FWD", thumb:playerThumb, selected:false, availability:"player-available", validity:"player-valid"},
            {id:'21', name:'Robin van Persie',position:"FWD", thumb:playerThumb, selected:false, availability:"player-available", validity:"player-valid"},
            {id:'22', name:'Paolo di Canio',position:"FWD", thumb:playerThumb, selected:false, availability:"player-available", validity:"player-valid"},
            {id:'23', name:'Iain Dowie',position:"FWD", thumb:playerThumb, selected:false, availability:"player-available", validity:"player-valid"},
        ]       
    }
}

export default SquadList;