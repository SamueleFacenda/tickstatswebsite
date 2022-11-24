import React from 'react';
import {BarChartBetweenLabels} from "./charts/MostUsedLabelChart";
import {WeeklyChart} from "./charts/WeeklyChart";


function ChartContainer(props) {
    return (
        <div className="chartcontainer" style={{height: 200}}>
            {props.children}
        </div>
    )
}


function TickLabel(props){
    return (
        <div>
            <h2>{props.data.label}</h2>
            <span>{props.data.createdat}</span>
        </div>
    )
}
export class TickStats extends React.Component {
    constructor(props) {
        super(props);
        // make a dictionary with an array of data for each label
        const labeldict = {};
        for (let i = 0; i < this.props.dataRaw.length; i++) {
            const ticklabel = this.props.dataRaw[i];
            if (labeldict[ticklabel.label] == null) {
                labeldict[ticklabel.label] = [];
            }
            labeldict[ticklabel.label].push(ticklabel);
        }

        //array of charts(components)
        this.charts = [
            BarChartBetweenLabels,
            WeeklyChart
        ];
        this.nCharts = this.charts.length;

        this.state = {
            dataRaw: props.dataRaw,
            labeldict: labeldict,
            dataFreq: props.dataFreq,
            showChart: new Array(this.nCharts).fill(false),
            dataElaborated: new Array(this.nCharts).fill(null)
        }

        // get the data and elaborate it for the charts
         this.operations = [
            () => {
                //operation for the first chart
                let max = 0;
                this.state.dataFreq.forEach((value) => {
                    if (value.frequency > max)
                        max = value.frequency;
                });
                return {freq: this.state.dataFreq, yAxis: Array.from(Array(max + 1).keys())};
            },
            () => {
                // elaborate the data for the second chart(divide the data for every week)
                let out = this.state.dataRaw.reduce((acc, singleData) => {
                    console.log(singleData);
                    const createdAt = new Date(singleData.createdat);
                    //get the week of the year number
                    const week = Math.floor(this.dayOfYear(createdAt) / 7);
                    // create a composed key: 'year-week'
                    const yearWeek = `${createdAt.getFullYear()}-${week}`;

                    // if the key is not present in the accumulator, create it
                    if (!acc[yearWeek]) {
                        acc[yearWeek] = {};
                        acc[yearWeek].total = 0;
                    }
                    // increment the counter for the label
                    if (!acc[yearWeek][singleData.label]) {
                        acc[yearWeek][singleData.label] = 0;
                    }
                    acc[yearWeek][singleData.label] += 1;
                    acc[yearWeek].total += 1;
                    return acc;
                }, {});

                let allLabels = new Set();
                let maxTotal = 0;

                //reformat the array to be suitable for the chart and find the max total
                out = Array.from(Object.entries(out)).map(([key, value]) => {
                    if(value.total > maxTotal)
                        maxTotal = value.total;
                    delete value.total;

                    Object.keys(value).forEach(allLabels.add, allLabels);
                    return {week: key, ...value};
                });

                return {data: out, allLabels: Array.from(allLabels), yAxis: Array.from(Array(maxTotal + 1).keys())};
            }
        ];
    }
    dayOfYear = date => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

    componentDidMount() {

        const data = this.state.dataRaw;
        for(let i=0; i<this.nCharts; i++){
            new Promise((resolve, reject) => {
                resolve(this.operations[i](data));
            }).then((data) => {
                this.setState({
                    show: this.state.showChart.fill(true, i, i+1),
                    dataElaborated: this.state.dataElaborated.fill(data, i, i+1)
                });
            });
        }

    }



    render() {
        return (
            <div>
                {/*
                <span>data: {this.props.dataRaw.map((ticklabel) => <TickLabel key={ticklabel.label+ticklabel.createdat} data={ticklabel}/>)}</span>
                */}
                {
                    this.charts.map((Component, i) => (
                        <ChartContainer key={i}>
                            {this.state.showChart[i] && <Component data={this.state.dataElaborated[i]} />}
                        </ChartContainer>
                                ))
                }

            </div>

        );
    }
}