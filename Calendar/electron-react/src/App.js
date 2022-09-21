import logo from './logo.svg';
import './App.css';
import ReactDOM, { hydrate } from 'react-dom'
import React from 'react'

const container = document.getElementById('root');
const container2 = document.getElementById('root2');

const root = ReactDOM.createRoot(container);
const root2 = ReactDOM.createRoot(container2);

window.fetch_data()

const monthNames = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"
];

var information_ = [
    {day: 12, month: 5, year: 2022, title: "Do something", description: "", red: 0, yellow: 0, green: 0, purple: 1},
    {day: 12, month: 5, year: 2022, title: "Talk to Jessie", description: "Talk to that weirdo today", red: 0, yellow: 0, green: 0, purple: 1}
]

var info_ = []

var previous_date = new Date().getDate()

var day_ = new Date().getDate()
var month_ = new Date().getMonth()
var year_ = new Date().getFullYear()

var text_not_sent = false;

setInterval(function(){
  console.log("attempting to text now...")
  if(new Date().getDate() !== previous_date || text_not_sent){
    previous_date = new Date().getDate();

    day_ = new Date().getDate()
    month_ = new Date().getMonth()
    year_ = new Date().getFullYear()

    get_info(day_, month_, year_)

    let temp_string = "Items to do for today (" + new Date().toLocaleString("en-US", {weekday: "long", month: "long", day: "2-digit", year: "numeric"}) + "):\n"
    if(info_.length !== 0)
      for(var i = 0; i < info_.length; i++){
        temp_string += information_[info_[i]].title + '\n'
      }
    else
      temp_string += "Nothing!"
    window.text_me(temp_string)
    console.log("message sent: \n" + temp_string)
  }
  console.log(text_not_sent)
}, 1000*60*30)

function add_info(){
  information_.push({day: day_, month: month_, year: year_, title: "Title", description: "Description", red: 0, yellow: 0, green: 0, purple: 1})
  root.render(<Calendar />)
  get_info(day_, month_, year_)
}

class Information extends React.Component {
    render(){
        return(
            <div id = "information_container">
                <h2>{new Date(year_, month_, day_).toLocaleString("en-US", {weekday: "long", month: "long", day: "2-digit", year: "numeric"})}</h2>
                {this.props.value}
                <button id = "add_reminder" onClick = {add_info}>ADD</button>
                <button id = "save_reminders" onClick = {()=>{window.set_info(information_)}}>SAVE</button>
            </div>
        )
    }
}

function remove_element(id_){
  information_.splice(id_, 1)
  console.log(id_)
  root.render(<Calendar />)
  get_info(day_, month_, year_)
}

class Title extends React.Component {
    constructor(props){
      super(props)

      this.text = ""
    }
    render(){
        return(
            <div className = 'titleContainer'>
              <button onClick = {()=>{
                remove_element(this.props.number)
              }} 
              className = "remove_button" 
              id = {this.props.number}>-</button>
              <div id = {this.props.number + "a"} contentEditable = "true" className = "Title" onInput = {(e)=>{
                information_[this.props.number].title = document.getElementById(this.props.number + "a").textContent;
              }}>
                  {this.props.value}
              </div>
            </div>
        )
    }
}

class Description extends React.Component {
    render(){
        return(
            <div id = {this.props.number + "b"} contentEditable = "true" className = "Description" onInput = {(e)=>{
              information_[this.props.number].description = document.getElementById(this.props.number + "b").textContent;
            }}>
                {this.props.value}
            </div>
        )
    }
}

class EmptyInfo extends React.Component {
  render(){
    return(
      <div id = "EmptyInfo">
          <div>Nothing is here! Click the <h3>ADD</h3> button to change that.</div>
      </div>
    )
  }
}


function get_info(day, month, year){
    day_ = new Date(year, month, day).getDate()
    month_ = new Date(year, month, day).getMonth()
    year_ = new Date(year, month, day).getFullYear()

    const get_usable_info = o => Object.keys(o).filter(k => o[k].day == day && o[k].month == month && o[k].year == year)

    info_ = get_usable_info(information_)

    var elements = []
    for(var i = 0; i < info_.length; i++){
        elements.push(<Title value = {information_[info_[i]].title} number = {info_[i]}/>)
        elements.push(<Description value = {information_[info_[i]].description} number = {info_[i]}/>)
    }
    if(info_.length == 0){
      elements = <EmptyInfo />
    }
    root2.render(<Information value = {elements} />)
}




class Day extends React.Component {
    render(){
        return(
            <div className = {"day " + this.props.event} id = {this.props.day} onClick = {()=>{get_info(this.props.day, this.props.month, this.props.year)}}>
                {this.props.day}
            </div>
        )
    }
}

class EmptyDay extends React.Component {
    render(){
        return(
            <div className = "emptyday">
                {this.props.day}
            </div>
        )
    }
}

class Row extends React.Component {
    render(){
        return(
            <div className = 'row'>
                {this.props.value}
            </div>
        )
    }
}

class Calendar extends React.Component {
    constructor(props){
        super(props)
        this.state = {month: 0, year: new Date().getFullYear()}

        this.change_month = this.change_month.bind(this)
        this.check_mouse = this.check_mouse.bind(this)

        //method 1
        // window.send_data_react = this
    }

    // send_d(info){
    //   console.log(info)
    // }

    componentDidMount(){
        this.setState({month: new Date().getMonth().toString()})
    }

    change_month(amount){
        this.setState({month: parseInt(this.state.month)+amount})
    }

    render_days(month, year){
        var rows = []
        var b = 0
        var index = 0
        var missed = 0
        for(var a = 0; a*7+b-new Date(year, month, 1).getDay()+1 <= new Date(year, month+1, 0).getDate(); a++){
            var days = []
            for(var b = 0; b < 7; b++){
                var day = a*7+b-new Date(year, month, 1).getDay()+1
                if(day < 1){
                    days.push(<EmptyDay day = {day+new Date(2022, month, 0).getDate()}/>)
                    missed += 1
                }
                else{
                  if(information_.some((e)=>{
                    return e.day == new Date(year, month, day).getDate() && e.month == new Date(year,month,day).getMonth() && e.year == new Date(year, month, day).getFullYear()
                  })){
                    var event = "ev"
                  }
                  else
                    var event = ""
                  days.push(<Day day = {day} month = {month} year = {year} event = {event}/>)
                }
            }
            rows.push(<Row value = {days} />)
            index = day+1
        }

        if(index <= new Date(year, month+1, 0).getDate()){
            days = []
            for(var i = index; i <= new Date(year, month+1, 0).getDate(); i++){
                if(information_.some((e)=>{
                  return e.day == new Date(year, month, i).getDate() && e.month == new Date(year,month,i).getMonth() && e.year == new Date(year, month, i).getFullYear()
                })){
                  var event = "ev"
                }
                else
                  var event = ""
                days.push(<Day day = {i} month = {month} year = {year} event = {event} />)
                index = i
            }
            if((index+missed)%7 !== 0)
                for(var i = 0; i < 7-(index+missed)%7; i++){
                    days.push(<EmptyDay day = {i+1} />)
                }
            rows.push(<Row value = {days} />)
        }

        return (
            rows
        )
    }

    check_mouse(button, amount){
        var still_over = true
        window.addEventListener("mouseup", ()=>{
            still_over = false
        })
        setTimeout(()=>{
            var const_int = setInterval(()=>{
                if(still_over)
                    this.change_month(amount)
                else
                    clearInterval(const_int)
            }, 250)
        }, 1000)
    }

    render(){
        return(
            <div id = "main_container">
                <input
                    id = "left_button" 
                    onMouseDown={()=>{
                        this.change_month(-1)
                        this.check_mouse("left_button", -1)
                    }}
                    type = "button" 
                    defaultValue = "<" 
                />
                <div id = "calendar_container">
                    <h1>
                        {monthNames[new Date(this.state.year, this.state.month, 1).getMonth()]} {this.state.year+Math.floor(this.state.month/12)}
                    </h1>
                    <h2>
                        {new Date().toLocaleString("en-US", {weekday: "long", month: "long", day: "2-digit", year: "numeric"})}
                    </h2>
                    <div id = "day_titles">
                      <h2>S</h2>
                      <h2>M</h2>
                      <h2>T</h2>
                      <h2>W</h2>
                      <h2>T</h2>
                      <h2>F</h2>
                      <h2>S</h2>
                    </div>
                    <div id = "days_container">
                        {this.render_days(parseInt(this.state.month), parseInt(this.state.year))}
                    </div>
                </div>
                <input 
                    id = "right_button"
                    type = "button" 
                    defaultValue = ">" 
                    onMouseDown={()=>{
                        this.change_month(1)
                        this.check_mouse("right_button", 1)
                    }}
                />
                
            </div>
        )
    }
}


//method 2
class test {
  constructor(){
    window.send_data_react = this
  }

  send_d(data){
    information_ = JSON.parse(data)
    root.render(<Calendar />)
    get_info(day_, month_, year_)
  }

  get_t(data){
    text_not_sent = data
  }
}



new test

export default Calendar;
