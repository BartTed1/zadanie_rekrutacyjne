import React from 'react';
import { seatsSelectedStore } from '../features/stores/store';
import { PageHeader, Divider, Layout, Typography, Card } from 'antd';
const { Text, Title } = Typography;
const { Content } = Layout;

class Search extends React.Component {
    componentDidMount() {
        window.addEventListener("popstate", (e) => {
            e.preventDefault();
            window.location = "/select";
        });
    }
    getSeats() {
        if (!(seatsSelectedStore.getState())) return window.location = "/";
        const seatsSelected = seatsSelectedStore.getState();
        return (
            seatsSelected.map((e, k) => {
                return <Card key={k} style={{margin: "2px 0px"}} size="small">
                    <span>Rząd {parseInt(e.x) + 1}, Miejsce {parseInt(e.y) + 1}</span>
                </Card>
            })
        )
    }
    render() {
        return (
            <div>
                <PageHeader
                    className="form__header"
                    title="Rezerwacja"
                    onBack={() => window.location = "/"}
                    subTitle="Podsumowanie rezerwacji"
                    style={{
                        backgroundColor: "#FFFFFF"
                    }}
                />
                <Divider style={{ margin: "0px" }} />
                <div className="container">
                    <Content style={{
                        minWidth: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        overflowY: "scroll"
                    }}>
                        <div className="centerContainer">
                            <Title>Twoja rezerwacja przebiegła pomyślnie</Title>
                            <Text strong>Wybrałeś miejsca:</Text>
                            {this.getSeats()}
                        </div>
                    </Content>
                </div>
            </div>
        )
    }
}

export default Search;