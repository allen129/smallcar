import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'antd';

export default class Bigpic extends Component {
    constructor(props) {
        super(props)

        this.state = {
            images: {}
        }
    }

    async componentWillMount() {
        const { result } = await axios.get('http://192.168.2.250:3000/car/' + this.props.nowId).then(data => data.data)
        this.setState({
            images: result.images
        })
    }
    render() {
        if (Object.keys(this.state.images).length == 0) {
            return <div></div>
        }
        // const abc = this.props.view.map((item, index) => item);
        // console.log(abc)
        return (
            <div>
                <Button onClick={() => {
                    this.props.goPrev()
                }}
                    disabled={this.props.index == 0}
                >上一张</Button>
                <img width="650"
                    className="tututu"
                    src={`http://192.168.2.250:3000/images/carimages/${this.props.nowId}/${this.props.tag}/${this.state.images[this.props.tag][this.props.index]}`} />
                <Button onClick={() => {
                    this.props.goNext(this.state.images[this.props.tag].length)
                }}
                    disabled={this.props.index == this.state.images[this.props.tag].length - 1}
                >下一张</Button>
            </div>
        )
    }
}
