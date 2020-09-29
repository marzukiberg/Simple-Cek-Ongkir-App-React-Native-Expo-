import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import CurrencyFormatter from "react-native-currency-format";
import { colors } from "../utils/Colors";
import { cekJne, cekPos, cekTiki } from "./functions/Result";

const Result = ({ route, navigation }) => {
  const { origin, destination, gram } = route.params;
  const [jne, setJne] = useState([]);
  const [pos, setPos] = useState([]);
  const [tiki, setTiki] = useState([]);
  const [loadingJne, setLoadingJne] = useState(false);
  const [loadingPos, setLoadingPos] = useState(false);
  const [loadingTiki, setLoadingTiki] = useState(false);

  useEffect(() => {
    cekJne(setLoadingJne, setJne, origin, destination, gram);
    cekPos(setLoadingPos, setPos, origin, destination, gram);
    cekTiki(setLoadingTiki, setTiki, origin, destination, gram);
  }, []);

  console.log(jne);
  console.log(pos);
  console.log(tiki);

  const ToRupiah = (number) => {
    let number_string = number
        .toString()
        .replace(/[^,\d]/g, "")
        .toString(),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;

    return rupiah;
  };

  const RenderLoading = () => {
    return (
      <View style={styles.contentResultBox} key={"loading"}>
        <View style={[styles.contentResultBoxLogo]}>
          <ActivityIndicator size={"large"} color="black" style={{ flex: 1 }} />
        </View>
        <View
          style={{
            margin: 15,
            alignItems: "flex-end",
          }}
        >
          <Text style={styles.contentResultBoxText}>
            <ActivityIndicator size={36} color="white" />
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.contentText}>
          {origin.city_name} ➡ {destination.city_name}
        </Text>
        <View>
          <View style={styles.contentDetail}>
            <View style={styles.contentDetailBox}>
              <Text style={styles.contentDetailBoxText}>
                {origin.city_name}, {origin.postal_code}, {origin.province}
              </Text>
            </View>
            <View style={styles.contentDetailBox}>
              <Text style={styles.contentDetailBoxText}>
                {destination.city_name}, {destination.postal_code},{" "}
                {destination.province}
              </Text>
            </View>
          </View>
          <Text style={styles.contentDetailGramText}>{gram} Gram</Text>
        </View>

        <ScrollView style={styles.contentResult}>
          {loadingJne ? (
            <RenderLoading />
          ) : jne.length !== 0 ? (
            jne.map((item) => {
              return (
                <View style={styles.contentResultBox} key={item.city_id}>
                  <View style={[styles.contentResultBoxLogo]}>
                    <Image
                      source={{
                        uri:
                          "https://tasimporttermurah.files.wordpress.com/2013/11/logo-jne.png",
                      }}
                      style={{ width: 100, height: 100 }}
                      resizeMode="contain"
                      resizeMethod="scale"
                    />
                  </View>
                  <View
                    style={{
                      margin: 15,
                      alignItems: "flex-end",
                    }}
                  >
                    <Text style={styles.contentResultBoxText}>
                      Rp.{" "}
                      <Text style={styles.bigText}>
                        {ToRupiah(item.cost[0].value)}
                      </Text>
                    </Text>
                    <Text style={styles.serviceText}>
                      Layanan: {item.service}
                    </Text>
                  </View>
                </View>
              );
            })
          ) : null}
          {loadingPos ? (
            <RenderLoading />
          ) : pos.length !== 0 ? (
            pos.map((item) => {
              return (
                <View style={styles.contentResultBox} key={item.city_id}>
                  <View style={[styles.contentResultBoxLogo]}>
                    <Image
                      source={{
                        uri:
                          "https://res.cloudinary.com/uki14/image/upload/v1601341355/cek-ongkir-mobile/kisspng-pos-indonesia-mail-point-of-sale-logo-indonesia-5aeb329c2f74d7.4438029915253633561944_gspe1y.png",
                      }}
                      style={{ width: 100, height: 100 }}
                      resizeMode="contain"
                      resizeMethod="scale"
                    />
                  </View>
                  <View style={{ margin: 15, alignItems: "flex-end" }}>
                    <Text style={styles.contentResultBoxText}>
                      Rp.{" "}
                      <Text style={styles.bigText}>
                        {ToRupiah(item.cost[0].value)}
                      </Text>
                    </Text>
                    <Text style={styles.serviceText}>
                      Layanan: {item.service}
                    </Text>
                  </View>
                </View>
              );
            })
          ) : null}
          {loadingTiki ? (
            <RenderLoading />
          ) : tiki.length !== 0 ? (
            tiki.map((item) => {
              return (
                <View style={styles.contentResultBox} key={item.city_id}>
                  <View style={[styles.contentResultBoxLogo]}>
                    <Image
                      source={{
                        uri:
                          "https://res.cloudinary.com/uki14/image/upload/v1601341510/cek-ongkir-mobile/Logo-TIKI_tqgbto.png",
                      }}
                      style={{ width: 100, height: 100 }}
                      resizeMode="contain"
                      resizeMethod="scale"
                    />
                  </View>
                  <View style={{ margin: 15, alignItems: "flex-end" }}>
                    <Text style={styles.contentResultBoxText}>
                      Rp.{" "}
                      <Text style={styles.bigText}>
                        {ToRupiah(item.cost[0].value)}
                      </Text>
                    </Text>
                    <Text style={styles.serviceText}>
                      Layanan: {item.service}
                    </Text>
                  </View>
                </View>
              );
            })
          ) : null}
        </ScrollView>
      </View>
    </View>
  );
};

export default Result;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryWhite,
  },
  content: {
    padding: 10,
    flex: 1,
  },
  contentText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  contentDetail: {
    flexDirection: "row",
  },
  contentDetailBox: {
    backgroundColor: "white",
    margin: 10,
    flex: 1,
    padding: 10,
  },
  contentDetailBoxText: {
    textAlign: "center",
    color: "black",
  },
  contentDetailGramText: {
    color: "white",
    backgroundColor: "#718093",
    padding: 10,
    elevation: 5,
    alignSelf: "center",
  },
  contentResult: {
    marginTop: 30,
  },
  contentResultBox: {
    backgroundColor: colors.primaryDark,
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "space-between",
    elevation: 5,
  },
  contentResultBoxLogo: {
    backgroundColor: colors.primaryWhite,
    width: 100,
  },
  contentResultBoxText: {
    fontWeight: "bold",
    color: "white",
  },
  contentButton: {
    position: "absolute",
    bottom: 30,
    backgroundColor: colors.primaryDark,
    alignSelf: "center",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  contentButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  bigText: {
    fontSize: 36,
  },
  serviceText: {
    color: "white",
    fontWeight: "bold",
  },
});
