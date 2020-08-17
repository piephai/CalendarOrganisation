import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicatorBase,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { Avatar, Card } from "react-native-paper";

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  eventInAgenda: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {},
    };
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={"2020-08-17"}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        theme={{
          calendarBackground: "white",
          selectedDayBackgroundColor: "orange",
          selectedDotColor: "white",
          dotColor: "white",
          todayTextColor: "black",
          dayTextColor: "grey",
          agendaTodayColor: "orange",
        }}

        // markingType={"period"}
        // markedDates={{
        //   "2017-05-08": { textColor: "black" },
        //   "2017-05-09": { textColor: "black" },
        //   "2017-05-14": { startingDay: true, endingDay: true, color: "blue" },
        //   "2017-05-21": { startingDay: true, color: "blue" },
        //   "2017-05-22": { endingDay: true, color: "gray" },
        //   "2017-05-24": { startingDay: true, color: "gray" },
        //   "2017-05-25": { color: "gray" },
        //   "2017-05-26": { endingDay: true, color: "gray" },
        // }}
        // monthFormat={"yyyy"}
        // theme={{ calendarBackground: "white", agendaKnobColor: "grey" }}
        // renderDay={(day, item) => <Text>{day ? day.day : "item"}</Text>}
        // hideExtraDays={false}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: "Current items for CIYA " + strTime + " #" + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach((key) => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems,
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.item, { height: item.height }]}
        onPress={() => Alert.alert(item.name)}
      >
        <View style={styles.eventInAgenda}>
          <Text>{item.name}</Text>
          <Avatar.Text label="TC" size={24} backgroundColor={"orange"} />
        </View>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }
}
