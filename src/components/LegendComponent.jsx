/*
 * Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { VictoryLegend, VictoryPortal, VictoryContainer } from 'victory';

/**
 * Class to handle the visualization of legends.
 */
export default class LegendComponent extends React.Component {
    render() {
        const { config, height, width, legendItems, interaction, theme } = this.props;
        return (
            <VictoryPortal>
                <VictoryLegend
                    x={
                        (() => {
                            if (!config.legendOrientation) return (width - 150);
                            else if (config.legendOrientation === 'right') {
                                return (width - 100);
                            } else if (config.legendOrientation === 'left') {
                                return 0;
                            } else return 100;
                        })()
                    }
                    y={
                        (() => {
                            if (!config.legendOrientation) return 0;
                            else if (config.legendOrientation === 'top') {
                                return 0;
                            } else if (config.legendOrientation === 'bottom') {
                                return height - 100;
                            } else return 0;
                        })()
                    }
                    standalone
                    containerComponent={<VictoryContainer responsive />}
                    centerTitle
                    height={height}
                    width={width}
                    orientation={
                        !config.legendOrientation ?
                            'vertical' :
                            (() => {
                                if (config.legendOrientation === 'left' || config.legendOrientation === 'right') {
                                    return 'vertical';
                                } else {
                                    return 'horizontal';
                                }
                            })()
                    }
                    style={{
                        title: {
                            fontSize: (config.style ? (config.style.legendTitleSize ||
                                theme.legend.style.title.fontSize) : theme.legend.style.title.fontSize),
                            fill: config.style ? config.style.legendTitleColor : theme.legend.style.title.fill,
                        },
                        labels: {
                            fontSize: config.style ? (config.style.legendTextSize ||
                                theme.legend.style.labels.fontSize) : theme.legend.style.labels.fontSize,
                            fill: config.style ? config.style.legendTextColor : theme.legend.style.labels.fill,
                        },
                    }}
                    data={legendItems.length > 0 ? legendItems : [{
                        name: 'undefined',
                        symbol: { fill: '#333' },
                    }]}
                    itemsPerRow={config.legendOrientation === 'top' || config.legendOrientation === 'bottom' ? 10
                        : null}
                    events={[
                        {
                            target: 'data',
                            eventHandlers: {
                                onClick: () => {
                                    return [{ target: 'data', mutation: interaction }];
                                },
                            },
                        },
                    ]}
                />
            </VictoryPortal>
        );
    }
}
