import React, { Component } from 'react';
import './less/ys.less';
import { Table, Checkbox, Row, Col, Tag, Modal } from 'antd';
import axios from 'axios';
import querystring from 'querystring';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import ModalInner from './components/ModalInner'

export default class App extends Component {
    constructor() {
        super()

        this.state = {
            dataSource: [],
            current: 1,
            total: 0,
            pageSize: 10,
            // 筛选条件
            color: [],
            exhaust: [],
            fuel: [],
            // 模态框
            isShowModal: false,
            // 当前点的汽车的id
            nowId: 0,
            brand: '',
            series: '',
            nowcolor: ''
        };
    }

    componentWillMount() {
        this.loadData()
    }

    async loadData() {
        const { results, total } = await axios.get('http://192.168.2.250:3000/car?' + querystring.stringify({
            page: this.state.current,
            color: this.state.color.join('v'),
            exhaust: this.state.exhaust.join('v'),
            fuel: this.state.fuel.join('v')
        })).then(data => data.data)

        this.setState({
            dataSource: results,
            total
        })
    }

    render() {
        return (
            <div className="wrap">

                <Modal
                    title={'品牌:' + this.state.brand + '  车系:' + this.state.series + '  颜色:' + this.state.nowcolor + '  车辆详情'}
                    visible={this.state.isShowModal}
                    onOk={() => {
                        this.setState({
                            isShowModal: false,
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            isShowModal: false,
                        })
                    }}
                    destroyOnClose={true}
                    width={880}
                >
                    <ModalInner nowId={this.state.nowId} />
                </Modal>

                <Row className="myrow">
                    <Col span={3}>
                        <b>颜色：</b>
                    </Col>
                    <Col span={21}>
                        <Checkbox.Group value={this.state.color} onChange={v => {
                            this.setState({
                                current: 1,
                                color: v
                            }, () => {
                                this.loadData()
                            })
                        }}>
                            {
                                ['红', '黄', '蓝', '黑', '白', '绿', '灰', '银灰'].map(item => <Checkbox value={item} key={item}>{item}</Checkbox>)
                            }
                        </Checkbox.Group>
                    </Col>
                </Row>

                <Row className="myrow">
                    <Col span={3}>
                        <b>尾气：</b>
                    </Col>
                    <Col span={21}>
                        <Checkbox.Group value={this.state.exhaust} onChange={v => {
                            this.setState({
                                current: 1,
                                exhaust: v
                            }, () => {
                                this.loadData()
                            })
                        }}>
                            {
                                ['国一', '国二', '国三', '国四', '国五'].map(item => <Checkbox key={item} value={item}>{item}</Checkbox>)
                            }
                        </Checkbox.Group>
                    </Col>
                </Row>

                <Row className="myrow">
                    <Col span={3}>
                        <b>燃料：</b>
                    </Col>
                    <Col span={21}>
                        <Checkbox.Group value={this.state.fuel} onChange={v => {
                            this.setState({
                                current: 1,
                                fuel: v
                            }, () => {
                                this.loadData()
                            })
                        }}>
                            {
                                ['汽油', '柴油', '油电混合', '纯电动'].map(item => <Checkbox key={item} value={item}>{item}</Checkbox>)
                            }
                        </Checkbox.Group>
                    </Col>
                </Row>

                <h3>共找到{this.state.total}辆车</h3>
                <div>
                    {
                        this.state.color.length != 0 ?
                            <Tag closable>颜色：{this.state.color.join('或')}</Tag>
                            : null
                    }
                    {
                        this.state.exhaust.length != 0 ?
                            <Tag closable>尾气：{this.state.exhaust.join('或')}</Tag>
                            : null
                    }
                    {
                        this.state.fuel.length != 0 ?
                            <Tag closable>燃料：{this.state.fuel.join('或')}</Tag>
                            : null
                    }
                </div>
                <Table
                    rowKey="id"
                    columns={
                        [
                            {
                                'title': '图片', 'key': 'image', 'dataIndex': 'image', render: (txt, { id, image, brand, series, color }) => {
                                    return <div>
                                        <img className="tutu" onClick={() => {
                                            // 点击图片，打开模态框，设置nowId
                                            this.setState({
                                                isShowModal: true,
                                                nowId: id,
                                                brand,
                                                series,
                                                nowcolor: color
                                            });
                                        }}
                                            width="120"
                                            src={`http://192.168.2.250:3000/images/carimages_small/${id}/view/${image}`} />
                                    </div>
                                }
                            },
                            { 'title': '编号', 'key': 'id', 'dataIndex': 'id' },
                            { 'title': '品牌', 'key': 'brand', 'dataIndex': 'brand' },
                            { 'title': '车系', 'key': 'series', 'dataIndex': 'series' },
                            { 'title': '颜色', 'key': 'color', 'dataIndex': 'color' },
                            { 'title': '发动机', 'key': 'engine', 'dataIndex': 'engine' },
                            { 'title': '尾气', 'key': 'exhaust', 'dataIndex': 'exhaust' },
                            { 'title': '燃料', 'key': 'fuel', 'dataIndex': 'fuel' }
                        ]
                    }
                    dataSource={this.state.dataSource}
                    pagination={{
                        current: this.state.current,
                        total: this.state.total,
                        pageSize: this.state.pageSize,
                        onChange: (page) => {
                            this.setState({
                                current: page
                            }, () => {
                                this.loadData();
                            })
                        }
                    }}
                />
            </div >
        )
    }
}
