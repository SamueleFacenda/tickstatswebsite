import {ResponsiveBar} from "@nivo/bar";
import React from "react";

export const WeeklyChart = ({data}) => {
    return <ResponsiveBar
        data={data.data}
        keys={data.allLabels}
        gridYValues={data.yAxis}
        indexBy="week"
        margin={{top: 50, right: 130, bottom: 50, left: 60}}
        padding={0.3}
        innerPadding={4}
        groupMode="stacked"
        valueScale={{ type: 'linear' }}
        indexScale={{type: 'band', round: true}}
        colors={{scheme: 'nivo'}}
        colorBy="id"
        defs={[
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'frequency'
                },
                id: 'lines'
            }
        ]}
        borderRadius={3}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisLeft={{tickValues: data.yAxis}}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'week',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Label usage comparison"
        barAriaLabel={function (e) {
            return e.id + ": " + e.formattedValue + " in country: " + e.indexValue
        }}
    />
}

