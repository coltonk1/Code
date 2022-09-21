const container = document.getElementById('root');
const container2 = document.getElementById('root2');

const root = ReactDOM.createRoot(container);
const root2 = ReactDOM.createRoot(container2);

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
    {day: 12, month: 5, year: 2022, title: "h", description: "Hello :)", red: 0, yellow: 0, green: 0, purple: 1},
    {day: 12, month: 5, year: 2022, title: "2", description: "Hello :)", red: 0, yellow: 0, green: 0, purple: 1}
]

var info_ = []

class Information extends React.Component {
    render(){
        return(
            <div>
                {this.props.value}
            </div>
        )
    }
}

class Title extends React.Component {
    render(){
        return(
            <div>
                {this.props.value}
            </div>
        )
    }
}

class Description extends React.Component {
    render(){
        return(
            <div>
                {this.props.value}
            </div>
        )
    }
}

function get_info(){
    var elements = []
    for(var i = 0; i < info_.length; i++){
        elements.push(<Title value = {information_[info_[i]].title}/>)
        elements.push(<Description value = {information_[info_[i]].description}/>)
    }
    root2.render(<Information value = {elements} />)
}






class Day extends React.Component {
    get_info(day, month, year){
        day = new Date(year, month, day).getDate()
        month = new Date(year, month, day).getMonth()
        year = new Date(year, month, day).getFullYear()

        const get_usable_info = o => Object.keys(o).filter(k => o[k].day == day && o[k].month == month && o[k].year == year)

        info_ = get_usable_info(information_)
        get_info()
    }

    render(){
        return(
            <div className = "day" id = {this.props.day} onClick = {()=>{this.get_info(this.props.day, this.props.month, this.props.year)}}>
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
    }

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
                else
                    days.push(<Day day = {day} month = {month} year = {year} />)
            }
            rows.push(<Row value = {days} />)
            index = day+1
        }

        if(index <= new Date(year, month+1, 0).getDate()){
            days = []
            for(var i = index; i <= new Date(year, month+1, 0).getDate(); i++){
                days.push(<Day day = {i} />)
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

