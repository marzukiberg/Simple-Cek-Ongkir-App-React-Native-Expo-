import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Header from "../components/Header";
import { API_KEY, BASE_URL } from "../utils/axios";
import { colors } from "../utils/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  findOrigin,
  getCities,
  findDestination,
  handleSubmit,
} from "./functions/Home";

const Home = (props) => {
  const { navigation } = props;
  let [cities, setCities] = useState([]);
  let [filteredOrigin, setFilteredOrigin] = useState([]);
  let [origin, setOrigin] = useState([]);
  let [inputOrigin, setInputOrigin] = useState("");
  let [filteredDestination, setFilteredDestination] = useState("");
  let [destination, setDestination] = useState([]);
  let [inputDestination, setInputDestination] = useState("");
  const [gram, setGram] = useState("");
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCities(setCities, setErr, setErrMessage, setLoading);
  }, []);

  console.log(err);
  console.log(cities);
  console.log(errMessage);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="white" />
          <Text style={{ color: "white" }}>Memuat Data Kota...</Text>
        </View>
      ) : err ? (
        <TouchableOpacity
          onPress={() => {
            getCities();
          }}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <MaterialCommunityIcons name="reload" color="white" size={36} />
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
          >
            {errMessage}
          </Text>
          <Text style={{ textAlign: "center", color: "white" }}>
            Tap to Reload
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.content}>
          <View style={styles.contentFormContainer}>
            <Text style={styles.contentFormText}>
              Masukkan kota asal, tujuan, dan berat barang yang akan dikirim
            </Text>
            <View style={styles.contentInputContainer}>
              <Text style={styles.contentInputLabel}>Kota Asal</Text>
              <KeyboardAvoidingView style={styles.contentInput}>
                <TextInput
                  placeholder="Ex: Pekanbaru..."
                  style={{ width: "100%" }}
                  onChangeText={(text) => {
                    findOrigin(
                      text,
                      cities,
                      setFilteredOrigin,
                      setOrigin,
                      setInputOrigin,
                      filteredOrigin
                    ),
                      setInputOrigin(text);
                  }}
                  value={inputOrigin}
                />
              </KeyboardAvoidingView>
              {filteredOrigin.length !== 0 ? (
                <ScrollView style={styles.result}>
                  {filteredOrigin.map((item) => {
                    return (
                      <TouchableOpacity
                        style={styles.resultButton}
                        key={item.city_id}
                        onPress={() => {
                          setFilteredOrigin([]);
                          setOrigin(item);
                          setInputOrigin(item.city_name);
                        }}
                      >
                        <Text style={styles.resultButtonText}>
                          {item.city_name}, {item.postal_code}, {item.province}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              ) : null}
            </View>
            <View style={styles.contentInputContainer}>
              <Text style={styles.contentInputLabel}>Kota Tujuan</Text>
              <KeyboardAvoidingView style={styles.contentInput}>
                <TextInput
                  style={{ width: "100%" }}
                  placeholder="Ex: Bandung..."
                  onChangeText={(text) => {
                    findDestination(
                      text,
                      cities,
                      setFilteredDestination,
                      setDestination,
                      setInputDestination,
                      filteredDestination
                    );
                    setInputDestination(text);
                  }}
                  value={inputDestination}
                />
              </KeyboardAvoidingView>
              {filteredDestination.length !== 0 ? (
                <ScrollView style={styles.destinationResult}>
                  {filteredDestination.map((item) => {
                    return (
                      <TouchableOpacity
                        style={styles.resultButton}
                        key={item.city_id}
                        onPress={() => {
                          setFilteredDestination([]);
                          setDestination(item);
                          setInputDestination(item.city_name);
                        }}
                      >
                        <Text style={styles.resultButtonText}>
                          {item.city_name}, {item.postal_code}, {item.province}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              ) : null}
            </View>
            <View style={styles.contentInputContainer}>
              <Text style={styles.contentInputLabel}>Berat Barang (gram)</Text>
              <KeyboardAvoidingView style={styles.contentInput}>
                <TextInput
                  style={{ width: "100%" }}
                  placeholder="Ex: 300"
                  onChangeText={(text) => setGram(text.replace(/[^0-9]/g, ""))}
                  value={gram}
                />
              </KeyboardAvoidingView>
            </View>
            <TouchableOpacity
              style={styles.contentButton}
              onPress={() =>
                handleSubmit(origin, destination, gram, navigation)
              }
            >
              <Text style={styles.contentButtonText}>CEK</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryLight,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentFormContainer: {
    marginHorizontal: 30,
    backgroundColor: colors.primaryWhite,
    padding: 30,
    elevation: 3,
  },
  contentFormText: {
    textAlign: "center",
    color: colors.primaryDark,
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 30,
  },
  contentInputContainer: {
    marginBottom: 30,
  },
  contentInputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primaryDark,
  },
  contentInput: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  contentButton: {
    backgroundColor: colors.primaryDark,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    elevation: 5,
  },
  contentButtonText: {
    color: colors.primaryWhite,
    fontWeight: "bold",
  },
  result: {
    position: "absolute",
    width: "100%",
    height: 150,
    zIndex: 10,
    backgroundColor: "white",
    top: 70,
  },
  resultButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.primaryWhite,
    backgroundColor: colors.primaryLight,
  },
  resultButtonText: {
    color: "white",
  },
  destinationResult: {
    position: "absolute",
    width: "100%",
    height: 150,
    zIndex: 10,
    backgroundColor: "white",
    bottom: 70,
  },
});
