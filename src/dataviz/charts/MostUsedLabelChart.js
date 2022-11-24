import {ResponsiveBar} from "@nivo/bar";
import React from "react";

export const BarChartBetweenLabels = ({ data }) => (
    <ResponsiveBar
        data={data.freq}
        keys={[ 'frequency' ]}
        indexBy="label"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        innerPadding={4}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        colorBy="indexValue"
        gridYValues={data.yAxis}
        borderRadius={3}
        borderWidth={1}
        axisTop={null}
        axisRight={null}
        axisLeft={{ tickValues: data.yAxis }}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'tick label',
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
        role="application"
        ariaLabel="Label usage comparison"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
    />
)

