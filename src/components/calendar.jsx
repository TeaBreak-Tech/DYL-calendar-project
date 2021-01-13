import React, {Component} from 'react';
import './calendar.css';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDay: '',
            currentMonth: '', 
            currentYear: '', 
            weekList: [
                {name: 'Mon', className: ''},
                {name: 'Tue', className: ''},
                {name: 'Wed', className: ''},
                {name: 'Thu', className: ''},
                {name: 'Fri', className: ''},
                {name: 'Sat', className: ''},
                {name: 'Sun', className: ''}
            ],
            dayList: []
        }

        this.initCalendar = this.initCalendar.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderBody = this.renderBody.bind(this);
        this.preMonth = this.preMonth.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
    }


    componentDidMount() {
        this.initCalendar()
    }

    //Get the current year and month
    getMonthFirstDate(date) {
        let nowYear = date.getFullYear();
        let nowMonth = date.getMonth()+1;
        return  `${nowYear}-${nowMonth}-01`
    }
    setDate

    //Get the current day
    getDateString(date) {
        let nowYear = date.getFullYear();
        let nowMonth = date.getMonth()+1;
        let day = date.getDate();
        day = day < 10 ? '0' + day : day;
        return  `${nowYear}-${nowMonth}-${day}`
    }

    //Last month
    preMonth() {
        let date = new Date(`${this.state.currentYear}-${this.state.currentMonth}-${this.state.currentDay}`)
        let preMonthFirstDate = new Date(this.getMonthFirstDate(new Date(date.setDate(0))));
        this.initCalendar(preMonthFirstDate)
    }

    //Next month
    nextMonth() {
        let date = new Date(`${this.state.currentYear}-${this.state.currentMonth}-${this.state.currentDay}`)
        let nextMonthFirstDate = new Date(this.getMonthFirstDate(new Date(date.setDate(33))));
        this.initCalendar(nextMonthFirstDate)
    }


    //Initialize the calendar
    initCalendar(currentDate) {
        
        let nowDate = currentDate ? currentDate : new Date();
        let nowMonthFirstDate = this.getMonthFirstDate(nowDate) 
        let nowWeek = new Date(nowMonthFirstDate).getDay() ? new Date(nowMonthFirstDate).getDay() : 7;  //Get week
        let startDay =  2 - nowWeek;  
        let showDayLength = 42;
        let newDateList = [];  //Create ana array of date
        
        for (let i = startDay; i < startDay + showDayLength; i++) {
            let date = new Date(new Date(nowMonthFirstDate).setDate(i)); //Get the time element
            let dayObject = {
                date: this.getDateString(date),
                day: date.getDate(),
                className: '',
            }
            // new Date(str).toDateString() === new Date().toDateString()
            if (date.toDateString() === new Date().toDateString()) {
                dayObject.className = 'today'
            }
            newDateList.push(dayObject)
        }
        console.log(newDateList);

        this.setState((pre) => {
            return {
                dayList: newDateList,
                currentDay: nowDate.getDate(),
                currentMonth: nowDate.getMonth() + 1 >= 10 ? nowDate.getMonth() + 1 : '0' + (nowDate.getMonth() + 1),
                currentYear: nowDate.getFullYear(),
            }
        })

    }

    renderHeader() {
        return(
            <div className = 'calendar-header'>
                <button onClick = {this.preMonth} className = "button">❮</button>
                <div className = 'calendar-head'>
                    {this.state.currentYear}-{this.state.currentMonth}
                </div>
                <button onClick = {this.nextMonth} className = "button">❯</button>
            </div>
        )
    }

    renderBody() {
        return(
            <div>
                <div className = 'week-container'>
                    {this.state.weekList.map(week => {
                        return <p key = {week.name} className = {`week ${week.className}`}>{week.name}</p>
                    })}
                </div>
                <div className = 'day-container'>
                    {this.state.dayList.map( (dayObject, index) => {
                        return <p key = {index} className = {`day ${dayObject.className}`}>{dayObject.day}</p>})}
                </div>
            </div>
        )
    }

    render() {
        return(
            <div className='calendar'>
                {this.renderHeader()}
                {this.renderBody()}
            </div>
        )
    }
}