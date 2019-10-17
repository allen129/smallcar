import React, { Component } from 'react';
import axios from 'axios';
import { Modal } from 'antd';
import Bigpic from './Bigpic'

export default class ModalInner extends Component {
    constructor(props) {
        super(props)

        this.state = {
            images: {},
            isModal: false,
            index: 0,
            tag: ''
        }
    }

    async componentWillMount() {
        const { result } = await axios.get('http://192.168.2.250:3000/car/' + this.props.nowId).then(data => data.data)
        this.setState({
            images: result.images
        })
    }

    goNext(l) {
        this.setState({
            index: this.state.index >= l - 1 ? l - 1 : this.state.index + 1
        })
    }
    goPrev() {
        this.setState({
            index: this.state.index <= 0 ? 0 : this.state.index - 1
        })
    }
    render() {
        const { nowId } = this.props;
        if (Object.keys(this.state.images).length == 0) {
            return <div></div>
        }
        return (
            <div>
                <Modal
                    width={870}
                    title="大图"
                    visible={this.state.isModal}
                    onOk={() => {
                        this.setState({
                            isModal: false,
                            index: 0
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            isModal: false,
                            index: 0
                        })
                    }}
                    destroyOnClose={true}
                >
                    <Bigpic nowId={nowId}
                        index={this.state.index}
                        tag={this.state.tag}
                        goNext={this.goNext.bind(this)}
                        goPrev={this.goPrev.bind(this)} />
                </Modal>
                <h1>外观：</h1>
                {
                    this.state.images.view.map((item, index) => <img key={item}
                        className="tututu"
                        src={`http://192.168.2.250:3000/images/carimages_small/${this.props.nowId}/view/${item}`}
                        onClick={() => {
                            this.setState({
                                isModal: true,
                                index,
                                tag: 'view'
                            })
                        }}
                    />)
                }
                <h1>内饰：</h1>
                {
                    this.state.images.inner.map((item, index) => <img key={item}
                        className="tututu"
                        src={`http://192.168.2.250:3000/images/carimages_small/${this.props.nowId}/inner/${item}`}
                        onClick={() => {
                            this.setState({
                                isModal: true,
                                index,
                                tag: 'inner'
                            })
                        }}
                    />)
                }
                <h1>发动机：</h1>
                {
                    this.state.images.engine.map((item, index) => <img key={item}
                        className="tututu"
                        src={`http://192.168.2.250:3000/images/carimages_small/${this.props.nowId}/engine/${item}`}
                        onClick={() => {
                            this.setState({
                                isModal: true,
                                index,
                                tag: 'engine'
                            })
                        }}
                    />)
                }
                <h1>更多：</h1>
                {
                    this.state.images.more.map((item, index) => <img key={item}
                        className="tututu"
                        src={`http://192.168.2.250:3000/images/carimages_small/${this.props.nowId}/more/${item}`}
                        onClick={() => {
                            this.setState({
                                isModal: true,
                                index,
                                tag: 'more'
                            })
                        }}
                    />)
                }
            </div>
        )
    }
}
