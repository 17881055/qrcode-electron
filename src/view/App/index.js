import React, { Component } from "react";
import ReactDom from 'react-dom';
import { Layout, Menu, Icon, Breadcrumb, Input, Row, Col, Button } from 'antd';
import qrcode from '../../lib/Qrcode';
import './style.css';
const { Header, Sider, Content, Footer } = Layout;
const { TextArea } = Input;
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textStr: null,
        };
    }

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({
            textStr: value
        });
    }

    createButton = () => {
        const { textStr } = this.state;
        var qrnode = new qrcode({
            render: 'canvas',
            correctLevel: 0,
            text: textStr || "",
            size: 298,
            background: '#eeeeee',
            foreground: '#667766',
            pdground: '#667766',
        });

        let qrcodeCanvas = ReactDom.findDOMNode(this.qrcodeCanvas);
        if (qrcodeCanvas.hasChildNodes()) {
            qrcodeCanvas.removeChild(qrcodeCanvas.childNodes[0]);
        }

        qrcodeCanvas.appendChild(qrnode);
    }

    render() {
        const { textStr } = this.state;
        return (
            <div>
                <Layout>
                    <Header style={{ position: 'fixed', width: '100%' }}>
                        <div className="logo" />
                        <h3 style={{ color: '#fff' }}>圆形二维码生成器</h3>
                    </Header>
                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <div style={{ padding: '80px 20px', minHeight: 610 }}>
                            <Row gutter={16}>
                                <Col span={16} >
                                    <TextArea
                                        placeholder="请输入"
                                        autosize={{ minRows: 18, maxRows: 18 }}
                                        onChange={this.handleChange}
                                        value={textStr}

                                    />
                                    <div style={{ marginTop: 80, textAlign: 'center' }}>
                                        <Button type="primary"
                                            ghost={true}
                                            onClick={this.createButton}>
                                            生成二维码
                                    </Button>
                                    </div>
                                </Col>
                                <Col span={8} >
                                    <div ref={(target) => { this.qrcodeCanvas = target; }} style={{
                                        marginLeft: 20,
                                        border: '1px solid #d9d9d9',
                                        height: 300,
                                        width: 300,
                                        borderRadius: 5,
                                        backgroundColor: '#FFF',
                                    }}>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                    </Footer>
                </Layout>
            </div>
        )
    }
}   