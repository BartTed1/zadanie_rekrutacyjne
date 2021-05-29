import React from 'react';
import { Link } from 'react-router-dom'
import { seatsNumberStore, isAlongsideStore } from '../features/stores/store';
import { PageHeader, Divider, Layout, InputNumber, Checkbox, Button } from 'antd';
const { Content } = Layout;

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            seatsNumber: 0,
            checkBoxDisabled: true
        }
    }
    numberInputChangeValueHandler = (value) => {
        seatsNumberStore.dispatch({
            type: 'SET_VALUE',
            value: value
        });
        this.setState({ seatsNumber: value });
        if (value > 1) this.setState({ checkBoxDisabled: false });
        else this.setState({ checkBoxDisabled: true });
    }
    checkBoxValueHandler = (e) => isAlongsideStore.dispatch({
        type: 'SET_VALUE',
        value: e.target.checked
    });
    submit = (e) => {
        e.preventDefault();
        if (this.state.seatsNumber) document.querySelector(".submit").click();
    }
    render() {
        return (
            <div>
                <PageHeader
                    className="form__header"
                    title="Rezerwacja"
                    subTitle="Wybierz liczbę miejsc i ustawienie"
                    style={{
                        backgroundColor: "#FFFFFF"
                    }}
                />
                <Divider style={{ margin: "0px" }} />
                <div className="container">
                    <Content style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div style={{
                            padding: "24px",
                            backgroundColor: "#FFFFFF",
                            border: "solid 1px rgba(0, 0, 0, 0.1)",
                            borderRadius: "2px"
                        }}>
                            <form onSubmit={this.submit}>
                                <InputNumber
                                    min={1}
                                    placeholder="Liczba miejsc"
                                    style={{ width: "100%", marginBottom: "10px" }}
                                    onChange={this.numberInputChangeValueHandler}
                                />
                                <br />
                                <Checkbox style={{ width: "100%", marginBottom: "20px" }} disabled={this.state.checkBoxDisabled} onChange={this.checkBoxValueHandler}>
                                    Czy miejsca mają być obok siebie?
                            </Checkbox>
                                <br />
                                <Link to="/select">
                                    <Button className="submit" type="primary" style={{ width: "100%" }} disabled={this.state.seatsNumber ? false : true}>Wybierz miejsca</Button>
                                </Link>
                            </form>
                        </div>
                    </Content>
                </div>
            </div>
        )
    }
}

export default Search;