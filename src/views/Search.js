import React from 'react';
import { PageHeader, Divider, Breadcrumb, Typography, Layout, InputNumber, Checkbox, Button } from 'antd';
const { Text } = Typography;
const { Content } = Layout;
class Search extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            seatsNumber: 0,
            checkBoxDisabled: true
        }
    }
    numberInputChangeValueHandler = (value) => {
        this.setState({seatsNumber: value});
        if (value > 1) this.setState({checkBoxDisabled: false});
        else this.setState({checkBoxDisabled: true, checkBoxValue: false});
    }
    checkBoxValueHandler = (e) => this.setState({checkBoxValue: e.target.checked});
    render() {
        return (
            <div className="search">
                <PageHeader
                    className="form__header"
                    // onBack={() => window.history.back()}
                    title="Rezerwacja miejsc"
                    extra={[
                        <Breadcrumb key={1}>
                            <Breadcrumb.Item>Wybierz liczbę miejsc</Breadcrumb.Item>
                        </Breadcrumb>
                    ]}
                    style={{
                        backgroundColor: "#FFFFFF",
                        height: "72px"
                    }}
                />
                <Divider style={{ margin: "0px" }} />
                <Content style={{
                    width: "100%",
                    height: "calc(100vh - 72px)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{
                        padding: "24px",
                        backgroundColor: "#FFFFFF",
                        border: "solid 1px rgba(0, 0, 0, 0.06)"
                    }}>
                        <InputNumber
                            min={1} 
                            placeholder="Liczba miejsc"
                            style={{width: "100%", marginBottom: "10px"}}
                            onChange={this.numberInputChangeValueHandler}
                        />
                        <br />
                        <Checkbox style={{width: "100%", marginBottom: "20px"}} disabled={this.state.checkBoxDisabled} onChange={this.checkBoxValueHandler}>
                            Czy miejsca mają być obok siebie?
                        </Checkbox>
                        <br />
                        <Button type="primary" style={{width: "100%"}} disabled={this.state.seatsNumber ? false : true}>Wybierz miejsca</Button>
                    </div>

                </Content>
            </div>
        )
    }
}

export default Search;