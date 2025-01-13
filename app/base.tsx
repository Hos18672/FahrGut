import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform, Pressable } from "react-native";
import ToggleSwitch from "./components/ToggleSwitch";
import { CustomTabProps, SubCategoryItemProps } from "./types";
import i18n from "i18next";
import { initI18n } from "./services/initI18n";
initI18n();
import { supabase } from "./services/supabase";
export const removeCharacters = (name) => {
  return name.replace(/[ -\/\\]/g, "");
};

export const flags = {
  de: { name: "At", url: require("./assets/at.png") },
  en: { name: "En", url: require("./assets/us.png") },
  fa: { name: "Fa", url: require("./assets/ir.png") },
};
export const groupByCategory = (questions: any[]) => {
  const categories: { [key: string]: any[] } = {};
  questions.forEach((question) => {
    if (!categories[question.category]) {
      categories[question.category] = [];
    }
    categories[question.category].push(question);
  });
  return Object.entries(categories).map(([category, questions]) => ({
    category,
    questions,
  }));
};

export const CustomTab: React.FC<CustomTabProps> = ({
  title,
  active,
  onPress,
}) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.tab,
      active && styles.activeTab,
      Platform.OS === "web" && pressed && styles.tabPressed,
    ]}
  >
    <Text style={[styles.tabText, active && styles.activeTabText]}>
      {title}
    </Text>
  </Pressable>
);

export const SubCategoryItem: React.FC<SubCategoryItemProps> = ({
  item,
  onPress,
}) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.subCategory,
      pressed && styles.subCategoryPressed,
    ]}
  >
    <View style={styles.subCategoryContent}>
      <Text style={styles.subCategoryText}>
        {i18n.t(removeCharacters(item.category))}
      </Text>
      <Text style={styles.subCategoryCount}>{item.questions.length}</Text>
    </View>
  </Pressable>
);

export const renderFilters = ({
  filterCorrectAnswersOnly,
  setFilterCorrectAnswersOnly,
  filterAlwaysShowTranslation,
  setFilterAlwaysShowTranslation,
}: {
  filterCorrectAnswersOnly: boolean;
  setFilterCorrectAnswersOnly: (value: boolean) => void;
  filterAlwaysShowTranslation: boolean;
  setFilterAlwaysShowTranslation: (value: boolean) => void;
}) => (
  <View style={styles.filterContainer}>
    <Text style={styles.modalTitle}>{i18n.t("filters")}</Text>
    <ToggleSwitch
      label={i18n.t("showOnlyCorrectAnswers")}
      value={filterCorrectAnswersOnly}
      onValueChange={() =>
        setFilterCorrectAnswersOnly(!filterCorrectAnswersOnly)
      }
    />
    <ToggleSwitch
      label={i18n.t("alwaysShowTranslation")}
      value={filterAlwaysShowTranslation}
      onValueChange={() =>
        setFilterAlwaysShowTranslation(!filterAlwaysShowTranslation)
      }
    />
  </View>
);

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: Platform.OS === "web" ? "20%" : 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "#0084ff",
  },
  tabPressed: {
    opacity: 0.8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#292929",
  },
  activeTabText: {
    color: "#ffffff",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  tabContent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  subCategory: {
    alignSelf: "center",
    width: Platform.OS == "web" ? "95%" : "100%",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    gap: 10,
    backgroundColor: "#fff",
  },
  subCategoryPressed: {
    opacity: 0.7,
  },
  subCategoryContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  subCategoryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    width: "93%",
  },
  subCategoryCount: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  filterContainer: {
    maxWidth: 500,
    alignSelf: "right",
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export const findDuplicates = (arr) => {
  const uniqueSet = new Set();
  const duplicates = [];

  arr.forEach((item) => {
    const stringified = JSON.stringify(item);
    if (uniqueSet.has(stringified)) {
      duplicates.push(item);
    } else {
      uniqueSet.add(stringified);
    }
  });
  console.log(Array.from(uniqueSet));

  return duplicates;
};

/// insert function
// Function to sanitize strings by removing null characters
const sanitizeString = (str) => {
  if (!str) return ""; // Handle null or undefined
  return str.replace(/\u0000/g, ""); // Remove null characters
};

const questions = [
  {
      "question_number": "71",
      "question_text": "Sie fahren mit etwa 80 km/h mit Fernlicht. Wie verhalten Sie sich?",
      "answers": [
          "Ich blende ab und fahre auf halbe Sicht",
          "Ich fahre ohne Änderung der Lichtstufe weiter",
          "Ich fahre bremsbereit entlang der Sperrlinie",
          "Ich blende ab und verringere gleichzeitig die Geschwindigkeit"
      ],
      "correct_answers": [
          "Ich blende ab und verringere gleichzeitig die Geschwindigkeit"
      ],
      "question_text_fa": "شما با حدود 80 کیلومتر در ساعت با نور بالا رانندگی می‌کنید. چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "من نور را کم می‌کنم و با دید نصفه رانندگی می‌کنم",
          "بدون تغییر در حالت نور به رانندگی ادامه می‌دهم",
          "من آماده ترمز در طول خط ممنوع رانندگی می‌کنم",
          "من نور را کم می‌کنم و همزمان سرعت را کاهش می‌دهم"
      ],
      "correct_answers_fa": [
          "من نور را کم می‌کنم و همزمان سرعت را کاهش می‌دهم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "72",
      "question_text": "Warum müssen Sie die Geschwindigkeit anpassen, wenn Sie abblenden?",
      "answers": [
          "Weil ich sonst Personen oder Gegenstände auf der Fahrbahn zu spät sehen würde",
          "Weil ich sonst nicht mehr innerhalb der Sichtweite anhalten kann",
          "Weil ich sonst den Gegenverkehr nicht rechtzeitig erkennen kann",
          "Weil sich damit die Reaktionszeit verkürzt"
      ],
      "correct_answers": [
          "Weil ich sonst Personen oder Gegenstände auf der Fahrbahn zu spät sehen würde",
          "Weil ich sonst nicht mehr innerhalb der Sichtweite anhalten kann"
      ],
      "question_text_fa": "چرا باید هنگام کاهش نور سرعت را تنظیم کنید؟",
      "answers_fa": [
          "زیرا در غیر این صورت افراد یا اشیاء روی جاده را دیر می‌بینم",
          "زیرا در غیر این صورت نمی‌توانم در محدوده دید توقف کنم",
          "زیرا در غیر این صورت نمی‌توانم به موقع ترافیک روبرو را ببینم",
          "زیرا زمان واکنش کوتاه‌تر می‌شود"
      ],
      "correct_answers_fa": [
          "زیرا در غیر این صورت افراد یا اشیاء روی جاده را دیر می‌بینم",
          "زیرا در غیر این صورت نمی‌توانم در محدوده دید توقف کنم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "73",
      "question_text": "Sie fahren mit etwa 80 km/h mit Fernlicht. Wann sollten Sie hier abblenden?",
      "answers": [
          "Sobald ich den Gegenverkehr kommen sehe",
          "Wenn der Gegenverkehr auf meiner Höhe ist",
          "Wenn der Gegenverkehr sein Fernlicht abblendet",
          "Sobald ich mich durch den Gegenverkehr geblendet fühle"
      ],
      "correct_answers": [
          "Wenn der Gegenverkehr sein Fernlicht abblendet",
          "Sobald ich mich durch den Gegenverkehr geblendet fühle"
      ],
      "question_text_fa": "شما با حدود 80 کیلومتر در ساعت با نور بالا رانندگی می‌کنید. چه زمانی باید نور را کم کنید؟",
      "answers_fa": [
          "به محض اینکه ترافیک روبرو را ببینم",
          "وقتی ترافیک روبرو در کنار من است",
          "وقتی ترافیک روبرو نور بالای خود را کم می‌کند",
          "به محض اینکه توسط ترافیک روبرو خیره شوم"
      ],
      "correct_answers_fa": [
          "وقتی ترافیک روبرو نور بالای خود را کم می‌کند",
          "به محض اینکه توسط ترافیک روبرو خیره شوم"
      ],
      "category": "B - Rechtsvorschriften"
  }
  ,
  {
      "question_number": "140",
      "question_text": "Sie fahren mit etwa 80 km/h mit Fernlicht. Wie verhalten Sie sich?",
      "answers": [
          "Ich blende ab und fahre auf halbe Sicht",
          "Ich fahre ohne Änderung der Lichtstufe weiter",
          "Ich fahre bremsbereit entlang der Sperrlinie",
          "Ich blende ab und verringere gleichzeitig die Geschwindigkeit"
      ],
      "correct_answers": [
          "Ich blende ab und verringere gleichzeitig die Geschwindigkeit"
      ],
      "question_text_fa": "شما با حدود 80 کیلومتر در ساعت با نور بالا رانندگی می‌کنید. چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "من نور را کم می‌کنم و با دید نصفه رانندگی می‌کنم",
          "بدون تغییر در حالت نور به رانندگی ادامه می‌دهم",
          "من آماده ترمز در طول خط ممنوع رانندگی می‌کنم",
          "من نور را کم می‌کنم و همزمان سرعت را کاهش می‌دهم"
      ],
      "correct_answers_fa": [
          "من نور را کم می‌کنم و همزمان سرعت را کاهش می‌دهم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "456",
      "question_text": "Sie wollen ein Kraftfahrzeug lenken. Wie können Sie überprüfen, ob es sich dabei um einen LKW handelt?",
      "answers": [
          "Das ist in der Zulassungsbescheinigung eingetragen",
          "Das steht in der Betriebsanleitung des Fahrzeuges",
          "Das ist am Armaturenbrett angeschrieben",
          "Das ist im Laderaum angeschrieben"
      ],
      "correct_answers": [
          "Das ist in der Zulassungsbescheinigung eingetragen"
      ],
      "question_text_fa": "شما می‌خواهید یک وسیله نقلیه موتوری را هدایت کنید. چگونه می‌توانید بررسی کنید که آیا این وسیله یک کامیون است؟",
      "answers_fa": [
          "این در گواهی ثبت نام ذکر شده است",
          "این در دفترچه راهنمای خودرو ذکر شده است",
          "این بر روی داشبورد نوشته شده است",
          "این در قسمت بار نوشته شده است"
      ],
      "correct_answers_fa": [
          "این در گواهی ثبت نام ذکر شده است"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "481",
      "question_text": "Wie schnell dürfen Sie mit diesem Fahrzeug höchstens fahren? (Ortsgebiet - Freiland - Autostraße - Autobahn)",
      "answers": [
          "50 km/h - 100 km/h - 100 km/h - 100 km/h",
          "50 km/h - 100 km/h - 100 km/h - 130 km/h",
          "50 km/h - 80 km/h - 100 km/h - 100 km/h",
          "50 km/h - 80 km/h - 80 km/h - 100 km/h"
      ],
      "correct_answers": [
          "50 km/h - 80 km/h - 100 km/h - 100 km/h"
      ],
      "question_text_fa": "حداکثر سرعت مجاز شما با این وسیله نقلیه چقدر است؟ (منطقه شهری - خارج از شهر - جاده اتومبیل‌رو - بزرگراه)",
      "answers_fa": [
          "50 کیلومتر/ساعت - 100 کیلومتر/ساعت - 100 کیلومتر/ساعت - 100 کیلومتر/ساعت",
          "50 کیلومتر/ساعت - 100 کیلومتر/ساعت - 100 کیلومتر/ساعت - 130 کیلومتر/ساعت",
          "50 کیلومتر/ساعت - 80 کیلومتر/ساعت - 100 کیلومتر/ساعت - 100 کیلومتر/ساعت",
          "50 کیلومتر/ساعت - 80 کیلومتر/ساعت - 80 کیلومتر/ساعت - 100 کیلومتر/ساعت"
      ],
      "correct_answers_fa": [
          "50 کیلومتر/ساعت - 80 کیلومتر/ساعت - 100 کیلومتر/ساعت - 100 کیلومتر/ساعت"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "482",
      "question_text": "Auf welchen Rädern (ausgenommen das Reserverad) müssen Spikesreifen montiert sein?",
      "answers": [
          "Mindestens auf zwei Antriebsrädern",
          "Auf allen Rädern",
          "Mindestens auf den Rädern einer Achse",
          "Mindestens auf den Vorderrädern"
      ],
      "correct_answers": [
          "Auf allen Rädern"
      ],
      "question_text_fa": "بر روی کدام چرخ‌ها (به استثنای چرخ زاپاس) باید لاستیک‌های میخ‌دار نصب شوند؟",
      "answers_fa": [
          "حداقل بر روی دو چرخ متحرک",
          "بر روی تمام چرخ‌ها",
          "حداقل بر روی چرخ‌های یک محور",
          "حداقل بر روی چرخ‌های جلو"
      ],
      "correct_answers_fa": [
          "بر روی تمام چرخ‌ها"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "518",
      "question_text": "Ihr Kraftfahrzeug ist mit einem Tank für AdBlue ausgerüstet. Mit welchen Problemen müssen Sie je nach Kraftfahrzeug rechnen, wenn Sie nicht rechtzeitig AdBlue nachtanken?",
      "answers": [
          "Der Motor kann nach dem Abstellen nicht mehr gestartet werden, solang kein AdBlue nachgefüllt wurde",
          "Der Motor kann von der elektronischen Steuerung in seiner Leistung stark eingeschränkt werden, solang kein AdBlue nachgefüllt wurde",
          "Der Motor stirbt sofort ab",
          "Der Auspuff wird nicht mehr mit Abgas versorgt"
      ],
      "correct_answers": [
          "Der Motor kann nach dem Abstellen nicht mehr gestartet werden, solang kein AdBlue nachgefüllt wurde",
          "Der Motor kann von der elektronischen Steuerung in seiner Leistung stark eingeschränkt werden, solang kein AdBlue nachgefüllt wurde"
      ],
      "question_text_fa": "خودروی شما مجهز به یک مخزن برای AdBlue است. بسته به نوع خودرو، اگر به موقع AdBlue را پر نکنید، با چه مشکلاتی روبرو خواهید شد؟",
      "answers_fa": [
          "موتور پس از خاموش شدن دیگر نمی‌تواند روشن شود تا زمانی که AdBlue پر شود",
          "موتور ممکن است توسط سیستم کنترل الکترونیکی به شدت در عملکرد محدود شود تا زمانی که AdBlue پر شود",
          "موتور بلافاصله خاموش می‌شود",
          "گازهای خروجی دیگر به اگزوز منتقل نمی‌شوند"
      ],
      "correct_answers_fa": [
          "موتور پس از خاموش شدن دیگر نمی‌تواند روشن شود تا زمانی که AdBlue پر شود",
          "موتور ممکن است توسط سیستم کنترل الکترونیکی به شدت در عملکرد محدود شود تا زمانی که AdBlue پر شود"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  }
  ,
  {
      "question_number": "519",
      "question_text": "Ihr Kraftfahrzeug ist mit einem Tank für die Flüssigkeit AdBlue ausgerüstet. Woran können Sie erkennen, dass AdBlue nachgetankt werden muss?",
      "answers": [
          "An einer eigenen Tankanzeige für AdBlue am Armaturenbrett",
          "An einer Kontrollleuchte",
          "An blauem Auspuffrauch",
          "An schwarzem Auspuffrauch"
      ],
      "correct_answers": [
          "An einer eigenen Tankanzeige für AdBlue am Armaturenbrett",
          "An einer Kontrollleuchte"
      ],
      "question_text_fa": "خودروی شما مجهز به مخزن مایع AdBlue است. چگونه می‌توانید تشخیص دهید که نیاز به پر کردن AdBlue دارید؟",
      "answers_fa": [
          "با نمایشگر مخصوص مخزن AdBlue روی داشبورد",
          "با چراغ هشدار",
          "با دود آبی از اگزوز",
          "با دود سیاه از اگزوز"
      ],
      "correct_answers_fa": [
          "با نمایشگر مخصوص مخزن AdBlue روی داشبورد",
          "با چراغ هشدار"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  }
  
  ,
  {
      "question_number": "521",
      "question_text": "Mit welchen Fahrzeugen dürfen Sie nach diesem Verkehrszeichen weiterfahren?",
      "answers": [
          "Mit einem PKW",
          "Mit einem LKW",
          "Mit einem vierrädrigen Leichtkraftfahrzeug (Mopedauto)",
          "Mit einem Motorfahrrad (Moped)"
      ],
      "correct_answers": [
          "Mit einem PKW",
          "Mit einem vierrädrigen Leichtkraftfahrzeug (Mopedauto)",
          "Mit einem Motorfahrrad (Moped)"
      ],
      "question_text_fa": "با چه وسیله نقلیه‌هایی مجاز به ادامه مسیر پس از این علامت هستید؟",
      "answers_fa": [
          "با یک خودروی سواری",
          "با یک کامیون",
          "با یک خودروی چهارچرخ سبک (خودروی موتوری کوچک)",
          "با یک موتورسیکلت (موتور)"
      ],
      "correct_answers_fa": [
          "با یک خودروی سواری",
          "با یک خودروی چهارچرخ سبک (خودروی موتوری کوچک)",
          "با یک موتورسیکلت (موتور)"
      ],
      "category": "B - Rechtsvorschriften"
  },

  {
      "question_number": "625",
      "question_text": "Was ist ab diesem Zeichen verboten?",
      "answers": [
          "Das Fahren mit einem Fahrzeug, das mehr als 1,5 t momentanes Gesamtgewicht hat",
          "Nur das Fahren mit einem LKW, der schwerer als 1,5 t ist. Das Fahren mit allen anderen Fahrzeugen ist erlaubt",
          "Nur das Ziehen eines Anhängers, der schwerer als 1,5 t ist. Das Fahren mit allen anderen Fahrzeugen ist erlaubt",
          "Nur das Fahren mit einem PKW, der schwerer als 1,5 t ist. Das Fahren mit allen anderen Fahrzeugen ist erlaubt"
      ],
      "correct_answers": [
          "Das Fahren mit einem Fahrzeug, das mehr als 1,5 t momentanes Gesamtgewicht hat"
      ],
      "question_text_fa": "پس از این علامت چه چیزی ممنوع است؟",
      "answers_fa": [
          "رانندگی با وسیله نقلیه‌ای که وزن کل آن بیش از 1.5 تن است",
          "فقط رانندگی با یک کامیون که سنگین‌تر از 1.5 تن است. رانندگی با سایر وسایل نقلیه مجاز است",
          "فقط کشیدن یک تریلر که وزن آن بیشتر از 1.5 تن است. رانندگی با سایر وسایل نقلیه مجاز است",
          "فقط رانندگی با یک خودروی سواری که سنگین‌تر از 1.5 تن است. رانندگی با سایر وسایل نقلیه مجاز است"
      ],
      "correct_answers_fa": [
          "رانندگی با وسیله نقلیه‌ای که وزن کل آن بیش از 1.5 تن است"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "626",
      "question_text": "Sie fahren mit einem PKW, der 1.200 kg Gesamtgewicht hat und ziehen einen Anhänger, der 700 kg Gesamtgewicht aufweist. Dürfen Sie hier weiterfahren?",
      "answers": [
          "Ja",
          "Nein",
          "Ja, aber nur, wenn der Anhänger zwei Achsen hat",
          "Ja, aber nur, wenn der Anhänger nicht zum Verkehr zugelassen ist"
      ],
      "correct_answers": [
          "Ja"
      ],
      "question_text_fa": "شما با یک خودروی سواری که وزن کل آن 1.200 کیلوگرم است رانندگی می‌کنید و یک تریلر با وزن 700 کیلوگرم را می‌کشید. آیا مجاز به ادامه مسیر هستید؟",
      "answers_fa": [
          "بله",
          "خیر",
          "بله، اما فقط اگر تریلر دارای دو محور باشد",
          "بله، اما فقط اگر تریلر برای استفاده جاده‌ای مجاز نباشد"
      ],
      "correct_answers_fa": [
          "بله"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "635",
      "question_text": "Dürfen Sie in diese Straße einfahren, um ein schweres Fernsehgerät abzuholen?",
      "answers": [
          "Nein",
          "Ja, aber nur mit Schrittgeschwindigkeit",
          "Ja, aber nur mit einem LKW",
          "Ja, aber nur, wenn ich für eine Firma arbeite"
      ],
      "correct_answers": [
          "Ja, aber nur mit Schrittgeschwindigkeit"
      ],
      "question_text_fa": "آیا مجاز هستید وارد این خیابان شوید تا یک تلویزیون سنگین را تحویل بگیرید؟",
      "answers_fa": [
          "خیر",
          "بله، اما فقط با سرعت پیاده‌روی",
          "بله، اما فقط با یک کامیون",
          "بله، اما فقط اگر برای یک شرکت کار می‌کنم"
      ],
      "correct_answers_fa": [
          "بله، اما فقط با سرعت پیاده‌روی"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "636",
      "question_text": "Dürfen Sie in diese Straße einfahren, um eine Zeitung zu kaufen?",
      "answers": [
          "Nein",
          "Ja, aber nur mit Schrittgeschwindigkeit",
          "Ja, aber nur mit einem LKW",
          "Ja, aber nur, wenn ich für eine Firma arbeite"
      ],
      "correct_answers": [
          "Nein"
      ],
      "question_text_fa": "آیا مجاز هستید وارد این خیابان شوید تا یک روزنامه بخرید؟",
      "answers_fa": [
          "خیر",
          "بله، اما فقط با سرعت پیاده‌روی",
          "بله، اما فقط با یک کامیون",
          "بله، اما فقط اگر برای یک شرکت کار می‌کنم"
      ],
      "correct_answers_fa": [
          "خیر"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "689",
      "question_text": "Sie wollen mit diesem Fahrzeug einen Anhänger ziehen. Welche Reifen müssen Sie am Anhänger verwenden?",
      "answers": [
          "Der Anhänger muss ebenfalls mit Spikesreifen ausgerüstet sein",
          "Der Anhänger muss mindestens mit Winterreifen ausgerüstet sein",
          "Der Anhänger kann auch mit Sommerreifen ausgerüstet sein",
          "Das ist egal"
      ],
      "correct_answers": [
          "Der Anhänger muss ebenfalls mit Spikesreifen ausgerüstet sein"
      ],
      "question_text_fa": "شما می‌خواهید با این وسیله نقلیه یک تریلر بکشید. چه نوع لاستیک‌هایی باید روی تریلر استفاده شوند؟",
      "answers_fa": [
          "تریلر باید نیز با لاستیک‌های میخ‌دار تجهیز شده باشد",
          "تریلر باید حداقل با لاستیک‌های زمستانی تجهیز شده باشد",
          "تریلر می‌تواند با لاستیک‌های تابستانی تجهیز شده باشد",
          "مهم نیست"
      ],
      "correct_answers_fa": [
          "تریلر باید نیز با لاستیک‌های میخ‌دار تجهیز شده باشد"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "691",
      "question_text": "Sie ziehen mit diesem PKW einen leichten Anhänger. Wie schnell dürfen Sie höchstens fahren (Ortsgebiet - Freiland - Autostraße - Autobahn)?",
      "answers": [
          "50 km/h - 100 km/h - 100 km/h - 100 km/h",
          "50 km/h - 100 km/h - 100 km/h - 130 km/h",
          "50 km/h - 80 km/h - 80 km/h - 100 km/h",
          "50 km/h - 80 km/h - 100 km/h - 100 km/h"
      ],
      "correct_answers": [
          "50 km/h - 80 km/h - 100 km/h - 100 km/h"
      ],
      "question_text_fa": "شما با این خودروی سواری یک تریلر سبک می‌کشید. حداکثر سرعت مجاز شما چقدر است؟ (منطقه شهری - خارج از شهر - جاده اتومبیل‌رو - بزرگراه)",
      "answers_fa": [
          "50 کیلومتر/ساعت - 100 کیلومتر/ساعت - 100 کیلومتر/ساعت - 100 کیلومتر/ساعت",
          "50 کیلومتر/ساعت - 100 کیلومتر/ساعت - 100 کیلومتر/ساعت - 130 کیلومتر/ساعت",
          "50 کیلومتر/ساعت - 80 کیلومتر/ساعت - 80 کیلومتر/ساعت - 100 کیلومتر/ساعت",
          "50 کیلومتر/ساعت - 80 کیلومتر/ساعت - 100 کیلومتر/ساعت - 100 کیلومتر/ساعت"
      ],
      "correct_answers_fa": [
          "50 کیلومتر/ساعت - 80 کیلومتر/ساعت - 100 کیلومتر/ساعت - 100 کیلومتر/ساعت"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "880",
      "question_text": "Dürfen Sie mit Ihrem PKW in diese Straße einfahren?",
      "answers": [
          "Ja, um auf einem gekennzeichneten Parkplatz zu parken",
          "Ja, aber nur zum Zu- und Abfahren",
          "Nein, außer es trifft eine der auf der Zusatztafel angegebenen Ausnahmen zu",
          "Ja, wenn ich dort einkaufen möchte"
      ],
      "correct_answers": [
          "Nein, außer es trifft eine der auf der Zusatztafel angegebenen Ausnahmen zu"
      ],
      "question_text_fa": "آیا با خودروی سواری خود مجاز به ورود به این خیابان هستید؟",
      "answers_fa": [
          "بله، برای پارک کردن در پارکینگ مشخص شده",
          "بله، اما فقط برای ورود و خروج",
          "خیر، مگر اینکه یکی از استثناهای ذکر شده در تابلوی اضافی اعمال شود",
          "بله، اگر بخواهم خرید کنم"
      ],
      "correct_answers_fa": [
          "خیر، مگر اینکه یکی از استثناهای ذکر شده در تابلوی اضافی اعمال شود"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "881",
      "question_text": "Sie dürfen aufgrund der Angaben auf der Zusatztafel in die Fußgängerzone einfahren. Wie schnell dürfen Sie dabei höchstens fahren?",
      "answers": [
          "20 km/h",
          "30 km/h",
          "10 km/h",
          "5 km/h (Schrittgeschwindigkeit)"
      ],
      "correct_answers": [
          "5 km/h (Schrittgeschwindigkeit)"
      ],
      "question_text_fa": "شما بر اساس اطلاعات موجود در تابلوی اضافی مجاز به ورود به منطقه پیاده‌رو هستید. حداکثر سرعت مجاز شما چقدر است؟",
      "answers_fa": [
          "20 کیلومتر/ساعت",
          "30 کیلومتر/ساعت",
          "10 کیلومتر/ساعت",
          "5 کیلومتر/ساعت (سرعت پیاده‌روی)"
      ],
      "correct_answers_fa": [
          "5 کیلومتر/ساعت (سرعت پیاده‌روی)"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "920",
      "question_text": "Sie fahren mit einem PKW und kommen zu diesem Verkehrszeichen. Wie verhalten Sie sich?",
      "answers": [
          "Ich fahre nur weiter, wenn Schneeketten montiert sind",
          "Es genügt zur Weiterfahrt, dass Winterreifen montiert sind",
          "Es genügt zur Weiterfahrt, dass Sommerreifen montiert sind",
          "Es genügt, wenn ich Schneeketten montiere, sobald die Fahrbahn schneebedeckt ist"
      ],
      "correct_answers": [
          "Ich fahre nur weiter, wenn Schneeketten montiert sind"
      ],
      "question_text_fa": "شما با خودروی سواری به این علامت ترافیکی نزدیک می‌شوید. چگونه باید عمل کنید؟",
      "answers_fa": [
          "فقط اگر زنجیر چرخ نصب شده باشد ادامه می‌دهم",
          "این کافی است که لاستیک‌های زمستانی نصب شده باشد",
          "این کافی است که لاستیک‌های تابستانی نصب شده باشد",
          "این کافی است اگر زنجیر چرخ‌ها را زمانی که جاده برفی است نصب کنم"
      ],
      "correct_answers_fa": [
          "فقط اگر زنجیر چرخ نصب شده باشد ادامه می‌دهم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "921",
      "question_text": "Sie kommen mit einem Kraftwagen zu diesem Verkehrszeichen. Auf welchen Rädern müssen Schneeketten montiert sein, damit Sie weiterfahren dürfen?",
      "answers": [
          "Auf allen Rädern",
          "Auf einem Vorderrad und einem Hinterrad",
          "Auf mindestens zwei nicht angetriebenen Rädern",
          "Auf mindestens zwei Antriebsrädern"
      ],
      "correct_answers": [
          "Auf mindestens zwei Antriebsrädern"
      ],
      "question_text_fa": "شما با یک خودروی موتوری به این علامت ترافیکی نزدیک می‌شوید. بر روی کدام چرخ‌ها باید زنجیر چرخ نصب شود تا مجاز به ادامه مسیر باشید؟",
      "answers_fa": [
          "بر روی تمام چرخ‌ها",
          "بر روی یک چرخ جلو و یک چرخ عقب",
          "بر روی حداقل دو چرخ غیر محرک",
          "بر روی حداقل دو چرخ محرک"
      ],
      "correct_answers_fa": [
          "بر روی حداقل دو چرخ محرک"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1034",
      "question_text": "Welches Licht dürfen Sie ab dieser Ortstafel verwenden?",
      "answers": [
          "Das Abblendlicht",
          "Das Tagfahrlicht",
          "Das Fernlicht",
          "Das Nebellicht"
      ],
      "correct_answers": [
          "Das Abblendlicht",
          "Das Nebellicht"
      ],
      "question_text_fa": "بعد از این تابلو چه چراغی را باید روشن کنید؟",
      "answers_fa": [
          "چراغ نور پایین",
          "چراغ روز",
          "چراغ نور بالا",
          "چراغ مه"
      ],
      "correct_answers_fa": [
          "چراغ نور پایین",
          "چراغ مه"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1035",
      "question_text": "Sie fahren mit Abblendlicht. Wie schnell dürfen Sie nach dem Verkehrszeichen \"Ortstafel\" höchstens fahren?",
      "answers": [
          "50 km/h",
          "100 km/h",
          "40 km/h",
          "70 km/h"
      ],
      "correct_answers": [
          "50 km/h"
      ],
      "question_text_fa": "شما با چراغ نور پایین رانندگی می‌کنید. بعد از علامت \"تابلوی شهر\" با چه سرعتی حداکثر می‌توانید حرکت کنید؟",
      "answers_fa": [
          "50 کیلومتر/ساعت",
          "100 کیلومتر/ساعت",
          "40 کیلومتر/ساعت",
          "70 کیلومتر/ساعت"
      ],
      "correct_answers_fa": [
          "50 کیلومتر/ساعت"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1036",
      "question_text": "Welches Licht dürfen Sie ab dieser Ortstafel verwenden?",
      "answers": [
          "Das Abblendlicht",
          "Das Tagfahrlicht",
          "Das Fernlicht",
          "Das Nebellicht"
      ],
      "correct_answers": [
          "Das Abblendlicht",
          "Das Fernlicht",
          "Das Nebellicht"
      ],
      "question_text_fa": "بعد از این تابلو چه چراغی را باید روشن کنید؟",
      "answers_fa": [
          "چراغ نور پایین",
          "چراغ روز",
          "چراغ نور بالا",
          "چراغ مه"
      ],
      "correct_answers_fa": [
          "چراغ نور پایین",
          "چراغ نور بالا",
          "چراغ مه"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1037",
      "question_text": "Sie fahren mit Fernlicht. Wie schnell dürfen Sie nach dem Verkehrszeichen \"Ortstafel\" höchstens fahren?",
      "answers": [
          "50 km/h",
          "100 km/h",
          "30 km/h",
          "70 km/h"
      ],
      "correct_answers": [
          "70 km/h"
      ],
      "question_text_fa": "شما با چراغ نور بالا رانندگی می‌کنید. بعد از علامت \"تابلوی شهر\" با چه سرعتی حداکثر می‌توانید حرکت کنید؟",
      "answers_fa": [
          "50 کیلومتر/ساعت",
          "100 کیلومتر/ساعت",
          "30 کیلومتر/ساعت",
          "70 کیلومتر/ساعت"
      ],
      "correct_answers_fa": [
          "70 کیلومتر/ساعت"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1038",
      "question_text": "Welches Licht dürfen Sie auf dieser Freilandstraße verwenden?",
      "answers": [
          "Das Abblendlicht",
          "Das Fernlicht",
          "Das Nebellicht",
          "Das Tagfahrlicht"
      ],
      "correct_answers": [
          "Das Abblendlicht",
          "Das Fernlicht",
          "Das Nebellicht"
      ],
      "question_text_fa": "در این جاده خارج از شهر چه چراغ‌هایی را می‌توانید استفاده کنید؟",
      "answers_fa": [
          "چراغ نور پایین",
          "چراغ نور بالا",
          "چراغ مه",
          "چراغ روز"
      ],
      "correct_answers_fa": [
          "چراغ نور پایین",
          "چراغ نور بالا",
          "چراغ مه"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1039",
      "question_text": "Sie fahren in dieser Situation mit Abblendlicht und Nebellicht. Welchen Vorteil hat das in dieser Situation gegenüber dem Fahren mit nur Abblendlicht allein?",
      "answers": [
          "Der Fahrbahnrand wird besser ausgeleuchtet",
          "Ich kann den Verlauf der Kurve besser erkennen",
          "Ich kann Hindernisse in der Kurve besser erkennen",
          "Ich kann Gegenverkehr besser erkennen"
      ],
      "correct_answers": [
          "Der Fahrbahnrand wird besser ausgeleuchtet",
          "Ich kann den Verlauf der Kurve besser erkennen",
          "Ich kann Hindernisse in der Kurve besser erkennen"
      ],
      "question_text_fa": "شما در این وضعیت با چراغ نور پایین و چراغ مه رانندگی می‌کنید. مزیت این کار در مقایسه با رانندگی فقط با چراغ نور پایین چیست؟",
      "answers_fa": [
          "لبه جاده بهتر روشن می‌شود",
          "من می‌توانم مسیر پیچ را بهتر ببینم",
          "من می‌توانم موانع در پیچ را بهتر ببینم",
          "من می‌توانم ترافیک مقابل را بهتر ببینم"
      ],
      "correct_answers_fa": [
          "لبه جاده بهتر روشن می‌شود",
          "من می‌توانم مسیر پیچ را بهتر ببینم",
          "من می‌توانم موانع در پیچ را بهتر ببینم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1275",
      "question_text": "Was bedeutet dieses Verkehrszeichen?",
      "answers": [
          "Dass ab sofort Schneeketten vorgeschrieben sind",
          "Dass ab sofort keine Schneeketten mehr verwendet werden müssen",
          "Dass ab sofort keine Schneeketten mehr verwendet werden dürfen",
          "Dass ab sofort keine Winterreifen mehr verwendet werden dürfen"
      ],
      "correct_answers": [
          "Dass ab sofort keine Schneeketten mehr verwendet werden müssen"
      ],
      "question_text_fa": "این علامت ترافیکی به چه معناست؟",
      "answers_fa": [
          "از این لحظه استفاده از زنجیر چرخ اجباری است",
          "از این لحظه استفاده از زنجیر چرخ دیگر لازم نیست",
          "از این لحظه استفاده از زنجیر چرخ دیگر مجاز نیست",
          "از این لحظه استفاده از لاستیک‌های زمستانی دیگر مجاز نیست"
      ],
      "correct_answers_fa": [
          "از این لحظه استفاده از زنجیر چرخ دیگر لازم نیست"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1276",
      "question_text": "Sie fahren im Dezember mit Ihrem PKW auf einer durchgehend schneebedeckten Fahrbahn. Wie verhalten Sie sich ab diesem Zeichen richtig?",
      "answers": [
          "Ich kann die Schneeketten montiert lassen, solang die Fahrbahn mit Schnee bedeckt ist",
          "Ich darf trotz der Schneefahrbahn die Ketten abnehmen, wenn ich Winterreifen montiert habe",
          "Ich darf trotz der Schneefahrbahn die Ketten abnehmen, wenn ich Sommerreifen mit mehr als 4 mm Profiltiefe montiert habe",
          "Ich muss die Schneeketten auf jeden Fall abnehmen"
      ],
      "correct_answers": [
          "Ich kann die Schneeketten montiert lassen, solang die Fahrbahn mit Schnee bedeckt ist",
          "Ich darf trotz der Schneefahrbahn die Ketten abnehmen, wenn ich Winterreifen montiert habe"
      ],
      "question_text_fa": "شما در دسامبر با خودروی خود در جاده‌ای کاملاً پوشیده از برف رانندگی می‌کنید. پس از این تابلو چگونه باید به درستی عمل کنید؟",
      "answers_fa": [
          "من می‌توانم زنجیر چرخ‌ها را تا زمانی که جاده پوشیده از برف است نگه دارم",
          "می‌توانم علی‌رغم جاده برفی، زنجیرها را بردارم اگر لاستیک‌های زمستانی نصب کرده باشم",
          "می‌توانم علی‌رغم جاده برفی، زنجیرها را بردارم اگر لاستیک‌های تابستانی با عمق پروفیل بیش از 4 میلی‌متر نصب کرده باشم",
          "باید به هر حال زنجیر چرخ‌ها را بردارم"
      ],
      "correct_answers_fa": [
          "من می‌توانم زنجیر چرخ‌ها را تا زمانی که جاده پوشیده از برف است نگه دارم",
          "می‌توانم علی‌رغم جاده برفی، زنجیرها را بردارم اگر لاستیک‌های زمستانی نصب کرده باشم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1383",
      "question_text": "Wie verhalten Sie sich in dieser Situation, wenn Sie mit etwa 80 km/h fahren?",
      "answers": [
          "Ich fahre ohne Änderung der Geschwindigkeit und der Beleuchtung weiter",
          "Ich blende ab, verringere die Fahrgeschwindigkeit aber nicht",
          "Ich blende ab und beginne gleichzeitig zu bremsen",
          "Ich verringere meine Geschwindigkeit und fahre mit Fernlicht weiter"
      ],
      "correct_answers": [
          "Ich blende ab und beginne gleichzeitig zu bremsen"
      ],
      "question_text_fa": "در این وضعیت، هنگامی که با حدود 80 کیلومتر در ساعت رانندگی می‌کنید، چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "من بدون تغییر در سرعت و نور به رانندگی ادامه می‌دهم",
          "من نور را کاهش می‌دهم اما سرعت را کم نمی‌کنم",
          "من نور را کاهش داده و همزمان شروع به ترمز می‌کنم",
          "من سرعت را کم کرده و با چراغ نور بالا به رانندگی ادامه می‌دهم"
      ],
      "correct_answers_fa": [
          "من نور را کاهش داده و همزمان شروع به ترمز می‌کنم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1384",
      "question_text": "Warum müssen Sie abbremsen, sobald Sie abblenden?",
      "answers": [
          "Weil ich die Geschwindigkeit der verringerten Sichtweite anpassen muss",
          "Weil ich sonst vor einem Hindernis nicht mehr anhalten könnte",
          "Weil ich sonst die Scheinwerfer überlasten würde",
          "Weil ich sonst den Verlauf des Fahrbahnrandes nicht sehen könnte"
      ],
      "correct_answers": [
          "Weil ich die Geschwindigkeit der verringerten Sichtweite anpassen muss",
          "Weil ich sonst vor einem Hindernis nicht mehr anhalten könnte"
      ],
      "question_text_fa": "چرا باید به محض کاهش نور چراغ‌ها سرعت را کاهش دهید؟",
      "answers_fa": [
          "زیرا باید سرعت خود را با کاهش دید تطبیق دهم",
          "زیرا در غیر این صورت نمی‌توانم جلوی یک مانع توقف کنم",
          "زیرا در غیر این صورت چراغ‌های جلو بیش از حد گرم می‌شوند",
          "زیرا در غیر این صورت نمی‌توانم مسیر لبه جاده را ببینم"
      ],
      "correct_answers_fa": [
          "زیرا باید سرعت خود را با کاهش دید تطبیق دهم",
          "زیرا در غیر این صورت نمی‌توانم جلوی یک مانع توقف کنم"
      ],
      "category": "B - Rechtsvorschriften"
  }
  ,
  {
      "question_number": "386",
      "question_text": "Ihr Kraftfahrzeug hat neben dem Einfüllstutzen für den Dieselkraftstoff auch einen für die Flüssigkeit AdBlue. Wozu dient diese Flüssigkeit?",
      "answers": [
          "Sie ist für die Einhaltung der aktuellen EURO-Abgasnorm des Motors notwendig",
          "Sie bewirkt einen geringeren Treibstoffverbrauch des Motors während der Fahrt",
          "Sie erhöht die Motorleistung im Teillastbereich des Motors während der Fahrt",
          "Sie verbessert die innere Reinigung des Motors"
      ],
      "correct_answers": [
          "Sie ist für die Einhaltung der aktuellen EURO-Abgasnorm des Motors notwendig"
      ],
      "question_text_fa": "خودروی شما علاوه بر دهانه سوخت‌گیری برای گازوئیل، یک دهانه برای مایع AdBlue دارد. این مایع به چه منظوری استفاده می‌شود؟",
      "answers_fa": [
          "برای رعایت استاندارد آلایندگی فعلی EURO در موتور ضروری است",
          "باعث کاهش مصرف سوخت موتور در حین رانندگی می‌شود",
          "قدرت موتور را در حین رانندگی در محدوده بار کم افزایش می‌دهد",
          "پاکسازی داخلی موتور را بهبود می‌بخشد"
      ],
      "correct_answers_fa": [
          "برای رعایت استاندارد آلایندگی فعلی EURO در موتور ضروری است"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  }
  ,
  {
      "question_number": "387",
      "question_text": "Ihr Kraftfahrzeug hat neben dem Einfüllstutzen für den Dieselkraftstoff auch einen für die Flüssigkeit AdBlue. Welche Farbe hat dieser Einfüllstutzen?",
      "answers": [
          "Blau",
          "Gelb",
          "Rot",
          "Grün"
      ],
      "correct_answers": [
          "Blau"
      ],
      "question_text_fa": "خودروی شما علاوه بر دهانه سوخت‌گیری برای گازوئیل، یک دهانه برای مایع AdBlue دارد. رنگ این دهانه چیست؟",
      "answers_fa": [
          "آبی",
          "زرد",
          "قرمز",
          "سبز"
      ],
      "correct_answers_fa": [
          "آبی"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  }
  ,
  {
      "question_number": "1386",
      "question_text": "Sie fahren hier mit etwa 100 km/h. Wie verhalten Sie sich in dieser Situation?",
      "answers": [
          "Ich fahre ohne Änderung der Geschwindigkeit und der Lichtstufe weiter",
          "Ich blende ab, fahre aber mit derselben Geschwindigkeit weiter",
          "Ich verringere die Geschwindigkeit und fahre mit Fernlicht weiter",
          "Ich blende ab und beginne gleichzeitig zu bremsen"
      ],
      "correct_answers": [
          "Ich blende ab und beginne gleichzeitig zu bremsen"
      ],
      "question_text_fa": "شما با سرعت حدود 100 کیلومتر در ساعت در حال رانندگی هستید. در این وضعیت چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "من بدون تغییر در سرعت و سطح نور به رانندگی ادامه می‌دهم",
          "من نور را کاهش می‌دهم، اما با همان سرعت ادامه می‌دهم",
          "سرعت را کم می‌کنم و با چراغ نور بالا به رانندگی ادامه می‌دهم",
          "نور را کاهش می‌دهم و همزمان شروع به ترمز می‌کنم"
      ],
      "correct_answers_fa": [
          "نور را کاهش می‌دهم و همزمان شروع به ترمز می‌کنم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1387",
      "question_text": "Sie fahren mit etwa 100 km/h mit Fernlicht. Warum bremsen Sie ab, wenn Sie abblenden?",
      "answers": [
          "Weil sonst die Geschwindigkeit für die eingesehene Strecke zu hoch sein könnte",
          "Weil ich sonst die Verkehrszeichen nicht mehr ablesen könnte",
          "Weil ich sonst dem Verlauf der Kurve nicht mehr nachfahren könnte",
          "Weil ich sonst ins Schleudern geraten könnte"
      ],
      "correct_answers": [
          "Weil sonst die Geschwindigkeit für die eingesehene Strecke zu hoch sein könnte"
      ],
      "question_text_fa": "شما با حدود 100 کیلومتر در ساعت با نور بالا رانندگی می‌کنید. چرا هنگام کاهش نور چراغ‌ها سرعت خود را کاهش می‌دهید؟",
      "answers_fa": [
          "زیرا در غیر این صورت سرعت برای مسافتی که دیده می‌شود بسیار زیاد خواهد بود",
          "زیرا در غیر این صورت نمی‌توانم علائم راهنمایی و رانندگی را بخوانم",
          "زیرا در غیر این صورت نمی‌توانم مسیر پیچ را دنبال کنم",
          "زیرا در غیر این صورت ممکن است کنترل خودرو از دست برود"
      ],
      "correct_answers_fa": [
          "زیرا در غیر این صورت سرعت برای مسافتی که دیده می‌شود بسیار زیاد خواهد بود"
      ],
      "category": "B - Rechtsvorschriften"
  }
  ,
  {
      "question_number": "1388",
      "question_text": "Wie verhalten Sie sich, wenn der Gegenverkehr nicht abblendet?",
      "answers": [
          "Ich verringere die Fahrgeschwindigkeit und gebe Warnzeichen (Lichthupe)",
          "Ich orientiere mich am rechten Fahrbahnrand (z.B. an der Randlinie)",
          "Ich orientiere mich an der Leitlinie",
          "Sollte ich durch Blendung nichts mehr sehen, halte ich in meinem Fahrstreifen an"
      ],
      "correct_answers": [
          "Ich verringere die Fahrgeschwindigkeit und gebe Warnzeichen (Lichthupe)",
          "Ich orientiere mich am rechten Fahrbahnrand (z.B. an der Randlinie)",
          "Sollte ich durch Blendung nichts mehr sehen, halte ich in meinem Fahrstreifen an"
      ],
      "question_text_fa": "اگر ترافیک مقابل نور خود را کاهش نداد، چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "سرعت خود را کم کرده و علائم هشدار دهنده (نور بالا) می‌دهم",
          "به لبه سمت راست جاده (مثلاً به خط کنار) توجه می‌کنم",
          "به خط راهنما توجه می‌کنم",
          "اگر به دلیل نور زیاد چیزی نمی‌بینم، در لاین خود متوقف می‌شوم"
      ],
      "correct_answers_fa": [
          "سرعت خود را کم کرده و علائم هشدار دهنده (نور بالا) می‌دهم",
          "به لبه سمت راست جاده (مثلاً به خط کنار) توجه می‌کنم",
          "اگر به دلیل نور زیاد چیزی نمی‌بینم، در لاین خود متوقف می‌شوم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1392",
      "question_text": "Sie fahren hier mit Ihrem PKW und haben das Abblendlicht eingeschaltet. Wie verhalten Sie sich in dieser Situation?",
      "answers": [
          "Ich orientiere mein Blickverhalten an der Leitlinie",
          "Ich fahre höchstens so schnell, dass ich innerhalb der Leuchtweite meines Abblendlichtes anhalten kann",
          "Ich orientiere mein Blickverhalten am rechten Fahrbahnrand",
          "Ich fahre mit höchstens 70 km/h weiter"
      ],
      "correct_answers": [
          "Ich fahre höchstens so schnell, dass ich innerhalb der Leuchtweite meines Abblendlichtes anhalten kann",
          "Ich orientiere mein Blickverhalten am rechten Fahrbahnrand"
      ],
      "question_text_fa": "شما با خودروی خود رانندگی می‌کنید و چراغ نور پایین روشن است. در این وضعیت چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "من تمرکز خود را بر خط راهنما قرار می‌دهم",
          "حداکثر با سرعتی رانندگی می‌کنم که بتوانم در محدوده نور چراغ نور پایین متوقف شوم",
          "من تمرکز خود را بر لبه سمت راست جاده قرار می‌دهم",
          "من با سرعت حداکثر 70 کیلومتر در ساعت رانندگی می‌کنم"
      ],
      "correct_answers_fa": [
          "حداکثر با سرعتی رانندگی می‌کنم که بتوانم در محدوده نور چراغ نور پایین متوقف شوم",
          "من تمرکز خود را بر لبه سمت راست جاده قرار می‌دهم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1393",
      "question_text": "Sie fahren hier mit Ihrem PKW und haben das Abblendlicht eingeschaltet. Warum orientieren Sie Ihr Blickverhalten am rechten Fahrbahnrand?",
      "answers": [
          "Weil ich sonst zu weit zur Fahrbahnmitte kommen könnte",
          "Damit ich Fußgänger, die eventuell am rechten Fahrbahnrand gehen, besser erkenne",
          "Damit ich durch das Licht des Gegenverkehrs nicht geblendet werde",
          "Damit ich nachkommende Fahrzeuge früher sehe"
      ],
      "correct_answers": [
          "Weil ich sonst zu weit zur Fahrbahnmitte kommen könnte",
          "Damit ich Fußgänger, die eventuell am rechten Fahrbahnrand gehen, besser erkenne",
          "Damit ich durch das Licht des Gegenverkehrs nicht geblendet werde"
      ],
      "question_text_fa": "شما در اینجا با خودروی خود رانندگی می‌کنید و چراغ‌های نور پایین را روشن کرده‌اید. چرا باید نگاه خود را به سمت لبه راست جاده هدایت کنید؟",
      "answers_fa": [
          "زیرا در غیر این صورت ممکن است بیش از حد به مرکز جاده نزدیک شوم",
          "تا بتوانم عابران پیاده‌ای که ممکن است در لبه راست جاده حرکت کنند بهتر ببینم",
          "تا از خیره شدن به نور خودروهای مقابل جلوگیری کنم",
          "تا خودروهای پشت سر را زودتر ببینم"
      ],
      "correct_answers_fa": [
          "زیرا در غیر این صورت ممکن است بیش از حد به مرکز جاده نزدیک شوم",
          "تا بتوانم عابران پیاده‌ای که ممکن است در لبه راست جاده حرکت کنند بهتر ببینم",
          "تا از خیره شدن به نور خودروهای مقابل جلوگیری کنم"
      ],
      "category": "B - Rechtsvorschriften"
  }
  ,
  {
      "question_number": "1402",
      "question_text": "Sie fahren hier mit etwa 100 km/h. Wie verhalten Sie sich in dieser Situation?",
      "answers": [
          "Ich fahre ohne Änderung der Geschwindigkeit und der Beleuchtung weiter",
          "Ich blende ab, fahre aber mit 100 km/h weiter",
          "Ich verringere die Geschwindigkeit und fahre mit Fernlicht weiter",
          "Ich blende ab und beginne gleichzeitig zu bremsen"
      ],
      "correct_answers": [
          "Ich blende ab und beginne gleichzeitig zu bremsen"
      ],
      "question_text_fa": "شما با سرعت حدود 100 کیلومتر در ساعت در حال رانندگی هستید. در این وضعیت چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "من بدون تغییر در سرعت و روشنایی به رانندگی ادامه می‌دهم",
          "نور را کاهش می‌دهم، اما با سرعت 100 کیلومتر در ساعت ادامه می‌دهم",
          "سرعت را کم می‌کنم و با چراغ نور بالا به رانندگی ادامه می‌دهم",
          "نور را کاهش می‌دهم و همزمان شروع به ترمز می‌کنم"
      ],
      "correct_answers_fa": [
          "نور را کاهش می‌دهم و همزمان شروع به ترمز می‌کنم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1412",
      "question_text": "Sie fahren mit einem Kraftfahrzeug. Welche Tätigkeiten können dabei stark vom Lenken ablenken?",
      "answers": [
          "Telefonieren, vor allem ohne geeignete Freisprecheinrichtung",
          "Schreiben von SMS",
          "Lesen von SMS, Emails, usw.",
          "Bedienen von Navigationssystemen"
      ],
      "correct_answers": [
          "Telefonieren, vor allem ohne geeignete Freisprecheinrichtung",
          "Schreiben von SMS",
          "Lesen von SMS, Emails, usw.",
          "Bedienen von Navigationssystemen"
      ],
      "question_text_fa": "شما با وسیله نقلیه‌ای در حال رانندگی هستید. چه فعالیت‌هایی می‌تواند باعث حواس‌پرتی شدید از رانندگی شود؟",
      "answers_fa": [
          "تماس تلفنی، به خصوص بدون هندزفری مناسب",
          "نوشتن پیامک",
          "خواندن پیامک، ایمیل و غیره",
          "استفاده از سیستم ناوبری"
      ],
      "correct_answers_fa": [
          "تماس تلفنی، به خصوص بدون هندزفری مناسب",
          "نوشتن پیامک",
          "خواندن پیامک، ایمیل و غیره",
          "استفاده از سیستم ناوبری"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1413",
      "question_text": "Warum kann Rauchen beim Lenken eines Fahrzeuges gefährlich sein?",
      "answers": [
          "Weil das Suchen nach Zigaretten und das Anzünden stark vom Lenken ablenkt",
          "Weil die Klimaanlage des Fahrzeuges überlastet wird",
          "Weil die Schadstoffe den Sauerstoffgehalt im Fahrgastraum vermindern und dadurch meine Konzentrationsfähigkeit sinkt",
          "Weil herabfallende Zigarettenglut zu falschen Reaktionen führen kann"
      ],
      "correct_answers": [
          "Weil das Suchen nach Zigaretten und das Anzünden stark vom Lenken ablenkt",
          "Weil die Schadstoffe den Sauerstoffgehalt im Fahrgastraum vermindern und dadurch meine Konzentrationsfähigkeit sinkt",
          "Weil herabfallende Zigarettenglut zu falschen Reaktionen führen kann"
      ],
      "question_text_fa": "چرا سیگار کشیدن هنگام رانندگی می‌تواند خطرناک باشد؟",
      "answers_fa": [
          "زیرا جستجوی سیگار و روشن کردن آن حواس را از رانندگی پرت می‌کند",
          "زیرا سیستم تهویه خودرو بیش از حد بارگذاری می‌شود",
          "زیرا مواد سمی میزان اکسیژن داخل خودرو را کاهش داده و تمرکز من را کم می‌کند",
          "زیرا افتادن خاکستر سیگار می‌تواند منجر به واکنش‌های نادرست شود"
      ],
      "correct_answers_fa": [
          "زیرا جستجوی سیگار و روشن کردن آن حواس را از رانندگی پرت می‌کند",
          "زیرا مواد سمی میزان اکسیژن داخل خودرو را کاهش داده و تمرکز من را کم می‌کند",
          "زیرا افتادن خاکستر سیگار می‌تواند منجر به واکنش‌های نادرست شود"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1565",
      "question_text": "Sie wollen auf einer Autobahn ein anderes Fahrzeug abschleppen. Dürfen Sie das?",
      "answers": [
          "Ja, aber nur bis zur nächsten Ausfahrt",
          "Ja, aber nur bis zum nächsten Parkplatz",
          "Nein",
          "Ja, aber nur bis zur nächsten Raststation"
      ],
      "correct_answers": [
          "Ja, aber nur bis zur nächsten Ausfahrt"
      ],
      "question_text_fa": "شما می‌خواهید یک وسیله نقلیه دیگر را در بزرگراه بکشانید. آیا مجاز هستید؟",
      "answers_fa": [
          "بله، اما فقط تا خروجی بعدی",
          "بله، اما فقط تا پارکینگ بعدی",
          "خیر",
          "بله، اما فقط تا استراحتگاه بعدی"
      ],
      "correct_answers_fa": [
          "بله، اما فقط تا خروجی بعدی"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1566",
      "question_text": "Sie wollen auf einer Autobahn ein anderes Fahrzeug abschleppen. Was müssen Sie dabei beachten?",
      "answers": [
          "Ich darf nur auf dem Pannenstreifen fahren",
          "Ich muss das Abblendlicht eingeschaltet haben",
          "Ich darf dabei nur den rechten Fahrstreifen der Autobahn benützen",
          "Ich darf dabei nicht schneller als 40 km/h fahren"
      ],
      "correct_answers": [
          "Ich muss das Abblendlicht eingeschaltet haben",
          "Ich darf dabei nur den rechten Fahrstreifen der Autobahn benützen",
          "Ich darf dabei nicht schneller als 40 km/h fahren"
      ],
      "question_text_fa": "شما می‌خواهید یک وسیله نقلیه دیگر را در بزرگراه بکشانید. چه نکاتی را باید در نظر داشته باشید؟",
      "answers_fa": [
          "من فقط مجاز به رانندگی در نوار توقف هستم",
          "باید چراغ نور پایین روشن باشد",
          "فقط می‌توانم از نوار سمت راست بزرگراه استفاده کنم",
          "نمی‌توانم با سرعت بیشتر از 40 کیلومتر در ساعت برانم"
      ],
      "correct_answers_fa": [
          "باید چراغ نور پایین روشن باشد",
          "فقط می‌توانم از نوار سمت راست بزرگراه استفاده کنم",
          "نمی‌توانم با سرعت بیشتر از 40 کیلومتر در ساعت برانم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1573",
      "question_text": "Sie fahren mit Ihrem PKW auf dieser Freilandstraße. Welche Beleuchtung dürfen Sie einschalten?",
      "answers": [
          "Das Abblendlicht",
          "Das Nebellicht",
          "Das Fernlicht",
          "Das Tagfahrlicht"
      ],
      "correct_answers": [
          "Das Abblendlicht",
          "Das Nebellicht"
      ],
      "question_text_fa": "شما با خودروی خود در این جاده روستایی رانندگی می‌کنید. چه نوری می‌توانید روشن کنید؟",
      "answers_fa": [
          "چراغ نور پایین",
          "چراغ مه",
          "چراغ نور بالا",
          "چراغ روز"
      ],
      "correct_answers_fa": [
          "چراغ نور پایین",
          "چراغ مه"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1574",
      "question_text": "Warum dürfen Sie auf dieser Freilandstraße in dieser Situation kein Fernlicht einschalten?",
      "answers": [
          "Weil mit dem Fernlicht der Stromverbrauch zu hoch wäre",
          "Weil ich mich mit dem Fernlicht selbst blenden würde",
          "Weil hier mit Abblend- oder Nebellicht die Fahrbahn am besten ausgeleuchtet wird",
          "Weil sonst die schneebedeckte Fahrbahn das Licht zu stark dämpft"
      ],
      "correct_answers": [
          "Weil ich mich mit dem Fernlicht selbst blenden würde",
          "Weil hier mit Abblend- oder Nebellicht die Fahrbahn am besten ausgeleuchtet wird"
      ],
      "question_text_fa": "چرا در این جاده روستایی در این وضعیت نمی‌توانید چراغ نور بالا را روشن کنید؟",
      "answers_fa": [
          "زیرا با چراغ نور بالا مصرف برق بیش از حد خواهد بود",
          "زیرا با چراغ نور بالا خود را کور می‌کنم",
          "زیرا با چراغ نور پایین یا مه جاده بهتر روشن می‌شود",
          "زیرا در غیر این صورت جاده برفی نور را به شدت کاهش می‌دهد"
      ],
      "correct_answers_fa": [
          "زیرا با چراغ نور بالا خود را کور می‌کنم",
          "زیرا با چراغ نور پایین یا مه جاده بهتر روشن می‌شود"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1575",
      "question_text": "Sie fahren auf einer Freilandstraße. Müssen Sie hier Scheinwerfer oder Leuchten einschalten?",
      "answers": [
          "Ja",
          "Ja, aber nur, solang Gegenverkehr kommt",
          "Ja, aber nur, solang andere Fahrzeuge vor mir fahren",
          "Nein"
      ],
      "correct_answers": [
          "Ja"
      ],
      "question_text_fa": "شما در یک جاده روستایی رانندگی می‌کنید. آیا باید چراغ‌ها را روشن کنید؟",
      "answers_fa": [
          "بله",
          "بله، اما فقط تا زمانی که ترافیک مقابل باشد",
          "بله، اما فقط تا زمانی که وسایل نقلیه دیگری قبل از من رانندگی کنند",
          "خیر"
      ],
      "correct_answers_fa": [
          "بله"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1576",
      "question_text": "Welche Scheinwerfer und Leuchten dürfen Sie in dieser Situation einschalten?",
      "answers": [
          "Das Abblendlicht",
          "Das Nebelschlusslicht, solang ich nachfahrende Fahrzeuglenker nicht blende",
          "Das Nebellicht",
          "Das Tagfahrlicht"
      ],
      "correct_answers": [
          "Das Abblendlicht",
          "Das Nebelschlusslicht, solang ich nachfahrende Fahrzeuglenker nicht blende",
          "Das Nebellicht"
      ],
      "question_text_fa": "در این وضعیت چه چراغ‌ها و نورهایی می‌توانید روشن کنید؟",
      "answers_fa": [
          "چراغ نور پایین",
          "چراغ مه انتهایی، به شرطی که رانندگان دیگر را کور نکنم",
          "چراغ مه",
          "چراغ روز"
      ],
      "correct_answers_fa": [
          "چراغ نور پایین",
          "چراغ مه انتهایی، به شرطی که رانندگان دیگر را کور نکنم",
          "چراغ مه"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1602",
      "question_text": "Sie fahren hier mit Ihrem PKW mit 30 km/h. Welches Licht dürfen Sie verwenden?",
      "answers": [
          "Das Abblendlicht",
          "Das Fernlicht",
          "Das Tagfahrlicht",
          "Das Nebellicht"
      ],
      "correct_answers": [
          "Das Abblendlicht",
          "Das Nebellicht"
      ],
      "question_text_fa": "شما با خودروی خود با سرعت 30 کیلومتر در ساعت در حال رانندگی هستید. چه نوری می‌توانید استفاده کنید؟",
      "answers_fa": [
          "چراغ نور پایین",
          "چراغ نور بالا",
          "چراغ روز",
          "چراغ مه"
      ],
      "correct_answers_fa": [
          "چراغ نور پایین",
          "چراغ مه"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1604",
      "question_text": "Dürfen Sie auf dieser Straße im Ortsgebiet das Begrenzungslicht allein verwenden?",
      "answers": [
          "Ja, aber nur, wenn mein Fahrzeug abgestellt ist",
          "Ja, aber nur, wenn ich nicht schneller als 30 km/h fahre",
          "Ja, weil die Fahrbahn ausreichend beleuchtet ist",
          "Nein"
      ],
      "correct_answers": [
          "Ja, aber nur, wenn mein Fahrzeug abgestellt ist"
      ],
      "question_text_fa": "آیا می‌توانید در این خیابان در محدوده شهری فقط از چراغ‌های محدوده استفاده کنید؟",
      "answers_fa": [
          "بله، اما فقط زمانی که وسیله نقلیه من پارک شده است",
          "بله، اما فقط زمانی که سرعت من بیشتر از 30 کیلومتر در ساعت نباشد",
          "بله، زیرا جاده به اندازه کافی روشن است",
          "خیر"
      ],
      "correct_answers_fa": [
          "بله، اما فقط زمانی که وسیله نقلیه من پارک شده است"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1611",
      "question_text": "Sie wollen einen anderen PKW abschleppen, der einen Motorschaden hat. Welche sinnvolle(n) Abschleppmethode(n) wählen Sie?",
      "answers": [
          "Ein Abschleppseil",
          "Eine Abschleppstange",
          "Das Ziehen mit Starterkabeln",
          "Ein Gummiseil"
      ],
      "correct_answers": [
          "Ein Abschleppseil",
          "Eine Abschleppstange"
      ],
      "question_text_fa": "شما می‌خواهید یک خودروی دیگر را که دچار خرابی موتور شده است بکشانید. کدام روش‌های مناسب برای کشش را انتخاب می‌کنید؟",
      "answers_fa": [
          "یک طناب کشش",
          "یک میله کشش",
          "کشیدن با کابل‌های استارت",
          "یک طناب لاستیکی"
      ],
      "correct_answers_fa": [
          "یک طناب کشش",
          "یک میله کشش"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1612",
      "question_text": "Sie schleppen einen anderen PKW mit einem Abschleppseil ab. Wie schnell dürfen Sie dabei höchstens fahren? (Ortsgebiet - Freiland - Autostraße - Autobahn)",
      "answers": [
          "40 km/h - 40 km/h - 40 km/h - 40 km/h",
          "40 km/h - 40 km/h - 80 km/h - 80 km/h",
          "50 km/h - 70 km/h - 80 km/h - 80 km/h",
          "50 km/h - 100 km/h - 100 km/h - 100 km/h"
      ],
      "correct_answers": [
          "40 km/h - 40 km/h - 40 km/h - 40 km/h"
      ],
      "question_text_fa": "شما یک خودروی دیگر را با یک طناب کشش می‌کشید. حداکثر سرعت مجاز شما چقدر است؟ (محدوده شهری - جاده روستایی - بزرگراه - بزرگراه)",
      "answers_fa": [
          "40 کیلومتر در ساعت - 40 کیلومتر در ساعت - 40 کیلومتر در ساعت - 40 کیلومتر در ساعت",
          "40 کیلومتر در ساعت - 40 کیلومتر در ساعت - 80 کیلومتر در ساعت - 80 کیلومتر در ساعت",
          "50 کیلومتر در ساعت - 70 کیلومتر در ساعت - 80 کیلومتر در ساعت - 80 کیلومتر در ساعت",
          "50 کیلومتر در ساعت - 100 کیلومتر در ساعت - 100 کیلومتر در ساعت - 100 کیلومتر در ساعت"
      ],
      "correct_answers_fa": [
          "40 کیلومتر در ساعت - 40 کیلومتر در ساعت - 40 کیلومتر در ساعت - 40 کیلومتر در ساعت"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1613",
      "question_text": "Sie wollen einen anderen PKW abschleppen, der nach einem Unfall eine defekte Lenkung hat. Welche sinnvolle(n) Möglichkeit(en) haben Sie, um das Fahrzeug zu entfernen?",
      "answers": [
          "Ein Abschleppseil",
          "Eine Abschleppstange",
          "Ich verlade den defekten PKW auf einen geeigneten Anhänger",
          "Ich verständige eine Abschleppfirma, die über ein geeignetes Fahrzeug verfügt"
      ],
      "correct_answers": [
          "Ich verlade den defekten PKW auf einen geeigneten Anhänger",
          "Ich verständige eine Abschleppfirma, die über ein geeignetes Fahrzeug verfügt"
      ],
      "question_text_fa": "شما می‌خواهید یک خودروی دیگر را بکشانید که بعد از یک تصادف فرمان آن خراب شده است. کدام گزینه‌های مناسب برای برداشتن وسیله نقلیه دارید؟",
      "answers_fa": [
          "یک طناب کشش",
          "یک میله کشش",
          "من خودروی معیوب را روی یک تریلر مناسب بار می‌زنم",
          "من یک شرکت کشش را تماس می‌زنم که دارای وسیله نقلیه مناسب است"
      ],
      "correct_answers_fa": [
          "من خودروی معیوب را روی یک تریلر مناسب بار می‌زنم",
          "من یک شرکت کشش را تماس می‌زنم که دارای وسیله نقلیه مناسب است"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1614",
      "question_text": "Sie wollen einen anderen PKW abschleppen, dessen Bremsen völlig ausgefallen sind. Welche sinnvolle(n) Möglichkeit(en) haben Sie, um das Fahrzeug zu entfernen?",
      "answers": [
          "Ich verständige eine Abschleppfirma, die über ein geeignetes Fahrzeug verfügt",
          "Ein Abschleppseil",
          "Eine Abschleppstange",
          "Ich verlade den defekten PKW auf einen geeigneten Anhänger"
      ],
      "correct_answers": [
          "Ich verständige eine Abschleppfirma, die über ein geeignetes Fahrzeug verfügt",
          "Eine Abschleppstange",
          "Ich verlade den defekten PKW auf einen geeigneten Anhänger"
      ],
      "question_text_fa": "شما می‌خواهید یک خودروی دیگر را بکشانید که ترمزهای آن کاملاً خراب شده است. کدام گزینه‌های مناسب برای برداشتن وسیله نقلیه دارید؟",
      "answers_fa": [
          "من یک شرکت کشش را تماس می‌زنم که دارای وسیله نقلیه مناسب است",
          "یک طناب کشش",
          "یک میله کشش",
          "من خودروی معیوب را روی یک تریلر مناسب بار می‌زنم"
      ],
      "correct_answers_fa": [
          "من یک شرکت کشش را تماس می‌زنم که دارای وسیله نقلیه مناسب است",
          "یک میله کشش",
          "من خودروی معیوب را روی یک تریلر مناسب بار می‌زنم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1632",
      "question_text": "Sie wollen mit diesem PKW Personen und Waren befördern. Welche Gewichtsgrenzen dürfen Sie dabei nicht überschreiten?",
      "answers": [
          "Das Gesamtgewicht darf höchstens 3.240 kg betragen",
          "Die Vorderachslast darf höchstens 1.450 kg betragen",
          "Die Hinterachslast darf höchstens 1.855 kg betragen",
          "Das Gesamtgewicht darf höchstens 2.540 kg betragen"
      ],
      "correct_answers": [
          "Das Gesamtgewicht darf höchstens 3.240 kg betragen",
          "Die Vorderachslast darf höchstens 1.450 kg betragen",
          "Die Hinterachslast darf höchstens 1.855 kg betragen"
      ],
      "question_text_fa": "شما می‌خواهید با این خودروی شخصی افراد و کالاها را حمل کنید. چه محدودیت‌های وزنی را نباید رعایت کنید؟",
      "answers_fa": [
          "وزن کل نباید بیشتر از 3.240 کیلوگرم باشد",
          "بار جلو نباید بیشتر از 1.450 کیلوگرم باشد",
          "بار عقب نباید بیشتر از 1.855 کیلوگرم باشد",
          "وزن کل نباید بیشتر از 2.540 کیلوگرم باشد"
      ],
      "correct_answers_fa": [
          "وزن کل نباید بیشتر از 3.240 کیلوگرم باشد",
          "بار جلو نباید بیشتر از 1.450 کیلوگرم باشد",
          "بار عقب نباید بیشتر از 1.855 کیلوگرم باشد"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1633",
      "question_text": "Sie beladen dieses Fahrzeug so, dass das höchste zulässige Gesamtgewicht von 3.240 kg überschritten ist. Kann das gefährlich werden? Warum?",
      "answers": [
          "Ja, das Fahrzeug kann einen Schaden erleiden",
          "Ja, weil das Fahrzeug vor allem beim Bremsen und Ausweichen unbeherrschbar werden kann",
          "Nein, auf keinen Fall",
          "Nein, wenn das Fahrzeug mit einem elektronischen Fahrer-Assistenzsystem (ESC, DSC, ESP, ...) ausgerüstet ist"
      ],
      "correct_answers": [
          "Ja, das Fahrzeug kann einen Schaden erleiden",
          "Ja, weil das Fahrzeug vor allem beim Bremsen und Ausweichen unbeherrschbar werden kann"
      ],
      "question_text_fa": "شما این وسیله نقلیه را به‌گونه‌ای بارگذاری می‌کنید که حداکثر وزن مجاز 3.240 کیلوگرم را تجاوز می‌کند. آیا این می‌تواند خطرناک باشد؟ چرا؟",
      "answers_fa": [
          "بله، وسیله نقلیه ممکن است آسیب ببیند",
          "بله، زیرا وسیله نقلیه به ویژه در هنگام ترمز کردن و دور زدن غیرقابل کنترل می‌شود",
          "خیر، هیچ‌گاه",
          "خیر، اگر وسیله نقلیه با یک سیستم کمک راننده الکترونیکی (ESC, DSC, ESP, ...) مجهز باشد"
      ],
      "correct_answers_fa": [
          "بله، وسیله نقلیه ممکن است آسیب ببیند",
          "بله، زیرا وسیله نقلیه به ویژه در هنگام ترمز کردن و دور زدن غیرقابل کنترل می‌شود"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1636",
      "question_text": "Sie beladen ein Fahrzeug. Darf die Ladung vorne hinausragen?",
      "answers": [
          "Ja, aber nicht mehr als 1/4 der Fahrzeuglänge",
          "Nein",
          "Ja, aber nicht mehr als 1 m",
          "Ja, unbegrenzt"
      ],
      "correct_answers": [
          "Ja, aber nicht mehr als 1/4 der Fahrzeuglänge"
      ],
      "question_text_fa": "شما یک وسیله نقلیه را بارگذاری می‌کنید. آیا بار می‌تواند از جلو بیرون بزند؟",
      "answers_fa": [
          "بله، اما نباید بیش از 1/4 طول وسیله نقلیه باشد",
          "خیر",
          "بله، اما نباید بیش از 1 متر باشد",
          "بله، بدون محدودیت"
      ],
      "correct_answers_fa": [
          "بله، اما نباید بیش از 1/4 طول وسیله نقلیه باشد"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1637",
      "question_text": "Womit ist eine Ladung, die vorne mehr als 1 m über ein Fahrzeug hinausragt, zu kennzeichnen?",
      "answers": [
          "Bei Dunkelheit mit einer weißen Tafel mit den Maßen 40 x 25 cm, mit rotem Rand, und zusätzlich mit einem weißen Rückstrahler und weißer Beleuchtung",
          "Bei Sichtbehinderung mit einer weißen Tafel mit den Maßen 40 x 25 cm, mit rotem Rand, und zusätzlich mit einem weißen Rückstrahler und weißer Beleuchtung",
          "Am Tag reicht eine weiße Tafel mit den Maßen 40 x 25 cm, mit rotem Rand",
          "Mit einem orangen Warnlicht"
      ],
      "correct_answers": [
          "Bei Dunkelheit mit einer weißen Tafel mit den Maßen 40 x 25 cm, mit rotem Rand, und zusätzlich mit einem weißen Rückstrahler und weißer Beleuchtung",
          "Bei Sichtbehinderung mit einer weißen Tafel mit den Maßen 40 x 25 cm, mit rotem Rand, und zusätzlich mit einem weißen Rückstrahler und weißer Beleuchtung",
          "Am Tag reicht eine weiße Tafel mit den Maßen 40 x 25 cm, mit rotem Rand"
      ],
      "question_text_fa": "چگونه باید بار که بیش از 1 متر از جلوی وسیله نقلیه بیرون زده است علامت‌گذاری شود؟",
      "answers_fa": [
          "در تاریکی با یک تابلو سفید با ابعاد 40 x 25 سانتی‌متر، با حاشیه قرمز، و به‌علاوه با یک بازتابنده سفید و نور سفید",
          "در صورت وجود موانع دید با یک تابلو سفید با ابعاد 40 x 25 سانتی‌متر، با حاشیه قرمز، و به‌علاوه با یک بازتابنده سفید و نور سفید",
          "در روز فقط یک تابلو سفید با ابعاد 40 x 25 سانتی‌متر، با حاشیه قرمز کافی است",
          "با یک نور هشدار نارنجی"
      ],
      "correct_answers_fa": [
          "در تاریکی با یک تابلو سفید با ابعاد 40 x 25 سانتی‌متر، با حاشیه قرمز، و به‌علاوه با یک بازتابنده سفید و نور سفید",
          "در صورت وجود موانع دید با یک تابلو سفید با ابعاد 40 x 25 سانتی‌متر، با حاشیه قرمز، و به‌علاوه با یک بازتابنده سفید و نور سفید",
          "در روز فقط یک تابلو سفید با ابعاد 40 x 25 سانتی‌متر، با حاشیه قرمز کافی است"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1638",
      "question_text": "Sie beladen ein Fahrzeug. Darf die Ladung hinten hinausragen?",
      "answers": [
          "Ja",
          "Nein",
          "Ja, aber nur höchstens 1 m",
          "Ja, unbegrenzt"
      ],
      "correct_answers": [
          "Ja"
      ],
      "question_text_fa": "شما یک وسیله نقلیه را بارگذاری می‌کنید. آیا بار می‌تواند از عقب بیرون بزند؟",
      "answers_fa": [
          "بله",
          "خیر",
          "بله، اما فقط حداکثر 1 متر",
          "بله، بدون محدودیت"
      ],
      "correct_answers_fa": [
          "بله"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1639",
      "question_text": "Die Ladung Ihres Fahrzeuges ragt hinten um mehr als 1/4 der Fahrzeuglänge hinaus. Wie schnell dürfen Sie dann höchstens fahren? (Ortsgebiet - Freiland - Autostraße - Autobahn)",
      "answers": [
          "50 km/h - 50 km/h - 80 km/h - 80 km/h",
          "50 km/h - 50 km/h - 70 km/h - 70 km/h",
          "50 km/h - 60 km/h - 70 km/h - 80 km/h",
          "50 km/h - 80 km/h - 80 km/h - 100 km/h"
      ],
      "correct_answers": [
          "50 km/h - 50 km/h - 80 km/h - 80 km/h"
      ],
      "question_text_fa": "بار وسیله نقلیه شما بیش از 1/4 طول وسیله نقلیه از عقب بیرون زده است. حداکثر سرعت مجاز شما چقدر است؟ (در محدوده شهری - در جاده‌های خارج شهری - در بزرگراه - در اتوبان)",
      "answers_fa": [
          "50 کیلومتر/ساعت - 50 کیلومتر/ساعت - 80 کیلومتر/ساعت - 80 کیلومتر/ساعت",
          "50 کیلومتر/ساعت - 50 کیلومتر/ساعت - 70 کیلومتر/ساعت - 70 کیلومتر/ساعت",
          "50 کیلومتر/ساعت - 60 کیلومتر/ساعت - 70 کیلومتر/ساعت - 80 کیلومتر/ساعت",
          "50 کیلومتر/ساعت - 80 کیلومتر/ساعت - 80 کیلومتر/ساعت - 100 کیلومتر/ساعت"
      ],
      "correct_answers_fa": [
          "50 کیلومتر/ساعت - 50 کیلومتر/ساعت - 80 کیلومتر/ساعت - 80 کیلومتر/ساعت"
      ],
      "category": "B - Rechtsvorschriften"
  }
  ,
  {
      "question_number": "1681",
      "question_text": "Dürfen Sie Ihren PKW nach diesen Verkehrszeichen abstellen? In welchen Fällen?",
      "answers": [
          "Ja, wenn ich eine schwere Waschmaschine vor einem Geschäft ablade",
          "Nein, auf keinen Fall",
          "Ja, wenn ich jemanden ein- oder aussteigen lasse",
          "Ja, wenn ich auf eine andere Person warten muss"
      ],
      "correct_answers": [
          "Ja, wenn ich eine schwere Waschmaschine vor einem Geschäft ablade",
          "Ja, wenn ich jemanden ein- oder aussteigen lasse"
      ],
      "question_text_fa": "آیا می‌توانید خودروی خود را در این تابلوهای ترافیکی پارک کنید؟ در چه مواردی؟",
      "answers_fa": [
          "بله، اگر یک ماشین لباسشویی سنگین را جلوی فروشگاه بار بزنم",
          "خیر، به هیچ وجه",
          "بله، اگر کسی را سوار یا پیاده کنم",
          "بله، اگر مجبور باشم منتظر شخص دیگری بمانم"
      ],
      "correct_answers_fa": [
          "بله، اگر یک ماشین لباسشویی سنگین را جلوی فروشگاه بار بزنم",
          "بله، اگر کسی را سوار یا پیاده کنم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1684",
      "question_text": "Was ist unter \"Ladetätigkeit\" zu verstehen?",
      "answers": [
          "Das Aus- oder Einladen größerer Gegenstände",
          "Das Ausladen eines Anzuges, um ihn in eine Putzerei zu bringen",
          "Das Ein- oder Aussteigenlassen von Personen",
          "Das Aufladen eines Elektroautos an einer öffentlichen Ladestation"
      ],
      "correct_answers": [
          "Das Aus- oder Einladen größerer Gegenstände"
      ],
      "question_text_fa": "منظور از \"فعالیت بارگذاری\" چیست؟",
      "answers_fa": [
          "بارگیری یا تخلیه اشیاء بزرگتر",
          "تخلیه یک کت برای بردن به خشکشویی",
          "سوار یا پیاده کردن افراد",
          "شارژ یک خودروی الکتریکی در یک ایستگاه شارژ عمومی"
      ],
      "correct_answers_fa": [
          "بارگیری یا تخلیه اشیاء بزرگتر"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1693",
      "question_text": "Sie wollen mit einem Klein-LKW aus einer Hauseinfahrt rückwärts ausfahren und haben keine Sicht auf den Straßenverkehr. Wie verhalten Sie sich?",
      "answers": [
          "Ich lasse mich von einer geeigneten Person unterstützen",
          "Ich fahre mit ca. 10 km/h zurück",
          "Ich hupe",
          "Ich fahre auf die Straße, bis ich Sicht auf den Fließverkehr habe"
      ],
      "correct_answers": [
          "Ich lasse mich von einer geeigneten Person unterstützen"
      ],
      "question_text_fa": "شما می‌خواهید با یک کامیون کوچک از یک راهرو خانگی به عقب برگردید و دیدی به ترافیک خیابان ندارید. چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "اجازه می‌دهم که یک شخص مناسب به من کمک کند",
          "با سرعت تقریبی 10 کیلومتر در ساعت به عقب می‌روم",
          "بوق می‌زنم",
          "به خیابان می‌روم تا دیدی به ترافیک جاری داشته باشم"
      ],
      "correct_answers_fa": [
          "اجازه می‌دهم که یک شخص مناسب به من کمک کند"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1694",
      "question_text": "Sie wollen mit einem Klein-LKW aus einer Hauseinfahrt rückwärts ausfahren und haben keine Sicht auf den Straßenverkehr. Ein Einweiser zeigt Ihnen, dass Sie fahren sollen. Wie verhalten Sie sich?",
      "answers": [
          "Ich taste mich zurück",
          "Ich muss mich nicht um andere Straßenbenützer kümmern, weil ich einen Einweiser habe",
          "Der Einweiser muss den Fließverkehr anhalten, ich kann daher schnell ausfahren",
          "Auch mit einem Einweiser darf ich bei schlechter Sicht nicht herausfahren"
      ],
      "correct_answers": [
          "Ich taste mich zurück"
      ],
      "question_text_fa": "شما می‌خواهید با یک کامیون کوچک از یک راهرو خانگی به عقب برگردید و دیدی به ترافیک خیابان ندارید. یک راهنما به شما نشان می‌دهد که باید بروید. چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "به آرامی به عقب می‌روم",
          "نیازی به نگرانی درباره سایر کاربران خیابان ندارم چون یک راهنما دارم",
          "راهنما باید ترافیک جاری را متوقف کند، بنابراین می‌توانم به سرعت خارج شوم",
          "حتی با یک راهنما نیز نمی‌توانم در شرایط دید ضعیف خارج شوم"
      ],
      "correct_answers_fa": [
          "به آرامی به عقب می‌روم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1744",
      "question_text": "Warum müssen Sie Ihr Fahrzeug bei winterlichen Fahrbahnverhältnissen mit Winterreifen ausstatten?",
      "answers": [
          "Weil das Fahrzeug beim Bremsen auf einer Schneefahrbahn dadurch nicht so leicht ins Schleudern kommt",
          "Weil die Bodenhaftung auf einer Schneefahrbahn dadurch besser ist",
          "Weil dadurch der Treibstoffverbrauch reduziert wird",
          "Weil Schneeketten nur auf Winterreifen montiert werden dürfen"
      ],
      "correct_answers": [
          "Weil das Fahrzeug beim Bremsen auf einer Schneefahrbahn dadurch nicht so leicht ins Schleudern kommt",
          "Weil die Bodenhaftung auf einer Schneefahrbahn dadurch besser ist"
      ],
      "question_text_fa": "چرا باید وسیله نقلیه خود را در شرایط جاده‌ای زمستانی با لاستیک‌های زمستانی تجهیز کنید؟",
      "answers_fa": [
          "زیرا وسیله نقلیه در هنگام ترمز بر روی جاده برفی به آسانی سر نمی‌خورد",
          "زیرا چسبندگی بر روی جاده برفی بهبود می‌یابد",
          "زیرا مصرف سوخت کاهش می‌یابد",
          "زیرا زنجیر برفی فقط بر روی لاستیک‌های زمستانی نصب می‌شود"
      ],
      "correct_answers_fa": [
          "زیرا وسیله نقلیه در هنگام ترمز بر روی جاده برفی به آسانی سر نمی‌خورد",
          "زیرا چسبندگی بر روی جاده برفی بهبود می‌یابد"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1745",
      "category": "B - Rechtsvorschriften",
      "question_text": "Dürfen Sie mit Ihrem PKW im Sommer mit Winterreifen fahren?",
      "answers": [
          "Ja, ich darf auch im Sommer mit Winterreifen fahren.",
          "Ich darf Winterreifen mit einer Profiltiefe unter 4 mm gemeinsam mit Sommerreifen verwenden.",
          "Nein, ich darf im Sommer nicht mit Winterreifen fahren.",
          "Ich darf wegen Aquaplaninggefahr Winterreifen nur auf der Hinterachse verwenden."
      ],
      "correct_answers": [
          "Ja, ich darf auch im Sommer mit Winterreifen fahren.",
          "Ich darf Winterreifen mit einer Profiltiefe unter 4 mm gemeinsam mit Sommerreifen verwenden."
      ],
      "question_text_fa": "آیا می‌توانم در تابستان با لاستیک‌های زمستانی رانندگی کنم؟",
      "answers_fa": [
          "بله، من می‌توانم در تابستان نیز با لاستیک‌های زمستانی رانندگی کنم.",
          "من می‌توانم لاستیک‌های زمستانی با عمق عاج کمتر از 4 میلی‌متر را همراه با لاستیک‌های تابستانی استفاده کنم.",
          "نه، من نمی‌توانم در تابستان با لاستیک‌های زمستانی رانندگی کنم.",
          "من به دلیل خطر آکواپلانینگ، فقط می‌توانم لاستیک‌های زمستانی را در محور عقب استفاده کنم."
      ],
      "correct_answers_fa": [
          "بله، من می‌توانم در تابستان نیز با لاستیک‌های زمستانی رانندگی کنم.",
          "من می‌توانم لاستیک‌های زمستانی با عمق عاج کمتر از 4 میلی‌متر را همراه با لاستیک‌های تابستانی استفاده کنم."
      ]
  }
  ,
  {
      "question_number": "1746",
      "question_text": "Welche Arten von Reifen dürfen Sie im Winter auf Ihrem PKW verwenden?",
      "answers": [
          "Ich darf - sofern keine winterlichen Fahrbahnverhältnisse vorliegen - vier Sommerreifen verwenden, muss jedoch mit schlechteren Fahreigenschaften rechnen",
          "Ich darf vier Winterreifen verwenden",
          "Ich darf vier Spikesreifen verwenden",
          "Ich darf auf den Antriebsrädern Spikesreifen verwenden, wenn auf den übrigen Rädern Winterreifen montiert sind"
      ],
      "correct_answers": [
          "Ich darf - sofern keine winterlichen Fahrbahnverhältnisse vorliegen - vier Sommerreifen verwenden, muss jedoch mit schlechteren Fahreigenschaften rechnen",
          "Ich darf vier Winterreifen verwenden",
          "Ich darf vier Spikesreifen verwenden"
      ],
      "question_text_fa": "چه نوع لاستیک‌هایی را می‌توانید در زمستان بر روی خودروی خود استفاده کنید؟",
      "answers_fa": [
          "می‌توانم - به شرطی که شرایط جاده‌ای زمستانی وجود نداشته باشد - چهار لاستیک تابستانی استفاده کنم، اما باید با ویژگی‌های عملکردی ضعیف‌تری حساب کنم",
          "می‌توانم چهار لاستیک زمستانی استفاده کنم",
          "می‌توانم چهار لاستیک میخ‌دار استفاده کنم",
          "می‌توانم بر روی محور محرک لاستیک‌های میخ‌دار استفاده کنم، اگر بر روی سایر چرخ‌ها لاستیک‌های زمستانی نصب شده باشد"
      ],
      "correct_answers_fa": [
          "می‌توانم - به شرطی که شرایط جاده‌ای زمستانی وجود نداشته باشد - چهار لاستیک تابستانی استفاده کنم، اما باید با ویژگی‌های عملکردی ضعیف‌تری حساب کنم",
          "می‌توانم چهار لاستیک زمستانی استفاده کنم",
          "می‌توانم چهار لاستیک میخ‌دار استفاده کنم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1747",
      "question_text": "In welchem Zeitraum gilt die \"situative Winterreifenpflicht\" für PKW?",
      "answers": [
          "Vom 1. November bis zum 15. April",
          "Vom 1. Dezember bis zum 31. März",
          "Vom 1. November bis zum Sonntag nach Ostern",
          "Von Allerheiligen bis Ostern"
      ],
      "correct_answers": [
          "Vom 1. November bis zum 15. April"
      ],
      "question_text_fa": "زمان اعتبار \"الزام لاستیک‌های زمستانی موقعیتی\" برای خودروها چه مدت است؟",
      "answers_fa": [
          "از 1 نوامبر تا 15 آوریل",
          "از 1 دسامبر تا 31 مارس",
          "از 1 نوامبر تا یکشنبه بعد از عید پاک",
          "از روز همه مقدسان تا عید پاک"
      ],
      "correct_answers_fa": [
          "از 1 نوامبر تا 15 آوریل"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1748",
      "question_text": "Welche Nachteile hat das Fahren mit Spikesreifen gegenüber dem Fahren mit Winterreifen?",
      "answers": [
          "Die Bodenhaftung ist bei trockener Fahrbahn schlechter",
          "Spikesreifen verursachen eine stärkere Fahrbahnabnützung",
          "Spikesreifen haben ein lauteres Abrollgeräusch",
          "Spikesreifen müssen öfter gewechselt werden"
      ],
      "correct_answers": [
          "Die Bodenhaftung ist bei trockener Fahrbahn schlechter",
          "Spikesreifen verursachen eine stärkere Fahrbahnabnützung",
          "Spikesreifen haben ein lauteres Abrollgeräusch"
      ],
      "question_text_fa": "مزایای رانندگی با لاستیک‌های میخ‌دار نسبت به رانندگی با لاستیک‌های زمستانی چیست؟",
      "answers_fa": [
          "چسبندگی بر روی جاده خشک ضعیف‌تر است",
          "لاستیک‌های میخ‌دار باعث سایش بیشتری در جاده می‌شوند",
          "لاستیک‌های میخ‌دار صدای بیشتری در حین حرکت تولید می‌کنند",
          "لاستیک‌های میخ‌دار باید بیشتر تعویض شوند"
      ],
      "correct_answers_fa": [
          "چسبندگی بر روی جاده خشک ضعیف‌تر است",
          "لاستیک‌های میخ‌دار باعث سایش بیشتری در جاده می‌شوند",
          "لاستیک‌های میخ‌دار صدای بیشتری در حین حرکت تولید می‌کنند"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1749",
      "question_text": "In welchem Zeitraum dürfen Sie Spikesreifen verwenden?",
      "answers": [
          "Nur vom 1. Oktober bis zum 31. Mai",
          "Nur vom 1. November bis zum 15. April",
          "Nur vom 1. Dezember bis zum 31. März",
          "Nur vom 1. November bis zum Sonntag nach Ostern"
      ],
      "correct_answers": [
          "Nur vom 1. Oktober bis zum 31. Mai"
      ],
      "question_text_fa": "در چه بازه زمانی می‌توانید از لاستیک‌های میخ‌دار استفاده کنید؟",
      "answers_fa": [
          "فقط از 1 اکتبر تا 31 مه",
          "فقط از 1 نوامبر تا 15 آوریل",
          "فقط از 1 دسامبر تا 31 مارس",
          "فقط از 1 نوامبر تا یکشنبه بعد از عید پاک"
      ],
      "correct_answers_fa": [
          "فقط از 1 اکتبر تا 31 مه"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1750",
      "question_text": "Sie fahren hier im Jänner. Wie verhalten Sie sich in dieser Situation?",
      "answers": [
          "Wenn ich mit einem LKW fahre, muss ich in jedem Fall Schneeketten anlegen",
          "Wenn ich mit einem PKW mit Winterreifen fahre, muss ich keine Schneeketten montieren",
          "Ich muss auf jeden Fall Schneeketten montieren",
          "Ich darf auf jeden Fall weiterfahren, ohne Schneeketten zu montieren"
      ],
      "correct_answers": [
          "Wenn ich mit einem LKW fahre, muss ich in jedem Fall Schneeketten anlegen",
          "Wenn ich mit einem PKW mit Winterreifen fahre, muss ich keine Schneeketten montieren"
      ],
      "question_text_fa": "شما در اینجا در ماه ژانویه در حال رانندگی هستید. در این وضعیت چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "اگر با کامیون رانندگی می‌کنم، در هر صورت باید زنجیر برف نصب کنم",
          "اگر با خودروی سواری با لاستیک‌های زمستانی رانندگی می‌کنم، نیازی به نصب زنجیر برف ندارم",
          "باید به هر حال زنجیر برف نصب کنم",
          "می‌توانم به هر حال ادامه دهم بدون اینکه زنجیر برف نصب کنم"
      ],
      "correct_answers_fa": [
          "اگر با کامیون رانندگی می‌کنم، در هر صورت باید زنجیر برف نصب کنم",
          "اگر با خودروی سواری با لاستیک‌های زمستانی رانندگی می‌کنم، نیازی به نصب زنجیر برف ندارم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1751",
      "question_text": "Sie fahren hier mit einem LKW. Auf welchen Rädern müssen Sie Schneeketten montieren?",
      "answers": [
          "Auf mindestens zwei Antriebsrädern",
          "Immer auf allen Rädern",
          "Nur auf den gelenkten Rädern",
          "Immer auf den Hinterrädern"
      ],
      "correct_answers": [
          "Auf mindestens zwei Antriebsrädern"
      ],
      "question_text_fa": "شما در حال رانندگی با یک کامیون هستید. بر روی کدام چرخ‌ها باید زنجیر برف نصب کنید؟",
      "answers_fa": [
          "بر روی حداقل دو چرخ محرک",
          "همیشه بر روی همه چرخ‌ها",
          "فقط بر روی چرخ‌های هدایت‌پذیر",
          "همیشه بر روی چرخ‌های عقب"
      ],
      "correct_answers_fa": [
          "بر روی حداقل دو چرخ محرک"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1756",
      "question_text": "Sie haben an Ihrem Fahrzeug Schneeketten montiert. Was müssen Sie beachten?",
      "answers": [
          "Nach kurzer Fahrstrecke muss ich die Spannung der Ketten überprüfen",
          "Wenn ich die Ketten nicht richtig spanne, kann es zu gefährlichen Fahrzeug- und Kettenschäden kommen",
          "Ich darf mit Schneeketten nur auf einer durchgehenden Schneefahrbahn weiterfahren, solang keine Schneekettenpflicht beschildert ist",
          "Mit Schneeketten darf ich nur vom 15. November bis zum ersten Sonntag nach Ostern fahren"
      ],
      "correct_answers": [
          "Nach kurzer Fahrstrecke muss ich die Spannung der Ketten überprüfen",
          "Wenn ich die Ketten nicht richtig spanne, kann es zu gefährlichen Fahrzeug- und Kettenschäden kommen",
          "Ich darf mit Schneeketten nur auf einer durchgehenden Schneefahrbahn weiterfahren, solang keine Schneekettenpflicht beschildert ist"
      ],
      "question_text_fa": "شما بر روی وسیله نقلیه خود زنجیر برف نصب کرده‌اید. چه نکاتی را باید رعایت کنید؟",
      "answers_fa": [
          "پس از مسافت کوتاهی باید تنش زنجیرها را بررسی کنم",
          "اگر زنجیرها را به درستی محکم نکنم، ممکن است به خودرو و زنجیرها آسیب‌های خطرناکی برسد",
          "با زنجیر برف فقط می‌توانم بر روی یک جاده برفی به صورت پیوسته ادامه دهم، به شرطی که نشانه زنجیر برف نصب نشده باشد",
          "با زنجیر برف فقط می‌توانم از 15 نوامبر تا اولین یکشنبه بعد از عید پاک رانندگی کنم"
      ],
      "correct_answers_fa": [
          "پس از مسافت کوتاهی باید تنش زنجیرها را بررسی کنم",
          "اگر زنجیرها را به درستی محکم نکنم، ممکن است به خودرو و زنجیرها آسیب‌های خطرناکی برسد",
          "با زنجیر برف فقط می‌توانم بر روی یک جاده برفی به صورت پیوسته ادامه دهم، به شرطی که نشانه زنجیر برف نصب نشده باشد"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1757",
      "category": "B - Rechtsvorschriften",
      "question_text": "Was müssen Sie beim Fahren mit Schneeketten auf einer Schneefahrbahn im Vergleich zum Fahren ohne Schneeketten beachten?",
      "answers": [
          "Ich fahre mit wesentlich verminderter Geschwindigkeit.",
          "Alle Fahrmanöver (wie Lenken, Bremsen, Gas geben) sind mit besonderer Vorsicht durchzuführen.",
          "Der Bremsweg auf Schneefahrbahn verlängert sich wesentlich.",
          "Der Reaktionsweg verlängert sich."
      ],
      "correct_answers": [
          "Ich fahre mit wesentlich verminderter Geschwindigkeit.",
          "Alle Fahrmanöver (wie Lenken, Bremsen, Gas geben) sind mit besonderer Vorsicht durchzuführen."
      ],
      "question_text_fa": "چه چیزی را باید هنگام رانندگی با زنجیر برف در جاده برفی در مقایسه با رانندگی بدون زنجیر برف رعایت کنید؟",
      "answers_fa": [
          "من با سرعت بسیار کاهش یافته می‌روم.",
          "تمامی حرکات رانندگی (مانند فرمان دادن، ترمز گرفتن، گاز دادن) باید با احتیاط ویژه انجام شود.",
          "مسافت ترمز در جاده برفی به طور قابل توجهی افزایش می‌یابد.",
          "مسافت واکنش افزایش می‌یابد."
      ],
      "correct_answers_fa": [
          "من با سرعت بسیار کاهش یافته می‌روم.",
          "تمامی حرکات رانندگی (مانند فرمان دادن، ترمز گرفتن، گاز دادن) باید با احتیاط ویژه انجام شود."
      ]
  }
  ,
  {
      "question_number": "1774",
      "question_text": "Ihr Fahrzeug ist mit einem Dachgepäcksträger ausgerüstet. Was müssen Sie bei der Beladung beachten?",
      "answers": [
          "Dass die zulässige Dachlast nicht überschritten wird",
          "Dass die Ladung nicht breiter als das Fahrzeug ist",
          "Dass die Ladung vorne nicht über das Fahrzeug hinausragt",
          "Dass die Ladung hinten nicht über das Fahrzeug hinausragt"
      ],
      "correct_answers": [
          "Dass die zulässige Dachlast nicht überschritten wird"
      ],
      "question_text_fa": "خودروی شما به یک باربند سقفی تجهیز شده است. هنگام بارگذاری چه نکاتی را باید رعایت کنید؟",
      "answers_fa": [
          "اینکه بار مجاز سقف را تجاوز نکنید",
          "اینکه بار از عرض خودرو وسیع‌تر نشود",
          "اینکه بار از جلو بیشتر از خودرو بیرون نرود",
          "اینکه بار از عقب بیشتر از خودرو بیرون نرود"
      ],
      "correct_answers_fa": [
          "اینکه بار مجاز سقف را تجاوز نکنید"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1775",
      "category": "B - Rechtsvorschriften",
      "question_text": "Ihr Fahrzeug ist mit einem Dachgepäcksträger ausgerüstet. Wie können Sie erfahren, wie hoch die zulässige Dachlast ist?",
      "answers": [
          "Indem ich in der Betriebsanleitung des Fahrzeuges nachsehe.",
          "Indem ich Informationen beim Fahrzeughersteller einhole.",
          "Das muss auf einem Aufkleber stehen, der am Dachgepäcksträger angebracht ist.",
          "Indem ich im COC-Papier des Fahrzeuges nachsehe."
      ],
      "correct_answers": [
          "Indem ich in der Betriebsanleitung des Fahrzeuges nachsehe.",
          "Indem ich Informationen beim Fahrzeughersteller einhole."
      ],
      "question_text_fa": "خودروی شما با یک باربند سقفی مجهز است. چگونه می‌توانید از بار مجاز سقف مطلع شوید؟",
      "answers_fa": [
          "با مراجعه به دستورالعمل عملیاتی خودرو.",
          "با درخواست اطلاعات از سازنده خودرو.",
          "این باید روی برچسبی که به باربند سقفی متصل است نوشته شده باشد.",
          "با مراجعه به مدارک COC خودرو."
      ],
      "correct_answers_fa": [
          "با مراجعه به دستورالعمل عملیاتی خودرو.",
          "با درخواست اطلاعات از سازنده خودرو."
      ]
  }
  ,
  {
      "question_number": "1776",
      "question_text": "Sie wollen mit Ihrem PKW Fahrräder transportieren. Was beachten Sie dabei?",
      "answers": [
          "Ich transportiere die Fahrräder auf einem geeigneten Fahrrad-Dachträger",
          "Ich transportiere die Fahrräder auf einem geeigneten Heckträger",
          "Fahrräder dürfen nur auf einem mitgeführten Fahrrad-Anhänger transportiert werden",
          "Fahrräder auf einem Heckträger dürfen die Kennzeichentafel oder Leuchten verdecken"
      ],
      "correct_answers": [
          "Ich transportiere die Fahrräder auf einem geeigneten Fahrrad-Dachträger",
          "Ich transportiere die Fahrräder auf einem geeigneten Heckträger"
      ],
      "question_text_fa": "شما می‌خواهید با خودروی خود دوچرخه‌ها را حمل کنید. چه نکاتی را در این زمینه رعایت می‌کنید؟",
      "answers_fa": [
          "دوچرخه‌ها را بر روی یک باربند سقفی مناسب حمل می‌کنم",
          "دوچرخه‌ها را بر روی یک باربند عقب مناسب حمل می‌کنم",
          "دوچرخه‌ها فقط باید بر روی یک تریلر دوچرخه حمل شوند",
          "دوچرخه‌ها بر روی باربند عقب نباید پلاک یا چراغ‌ها را بپوشانند"
      ],
      "correct_answers_fa": [
          "دوچرخه‌ها را بر روی یک باربند سقفی مناسب حمل می‌کنم",
          "دوچرخه‌ها را بر روی یک باربند عقب مناسب حمل می‌کنم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1779",
      "question_text": "Sie wollen mit Ihrem PKW Elektro-Fahrräder (Pedelecs) befördern. Was sollten Sie dabei beachten?",
      "answers": [
          "Pedelecs sollten wegen ihres Gewichts möglichst am Fahrzeugdach transportiert werden",
          "Wenn der Fahrradträger auf der Anhängekupplung montiert wird, muss ich die Stützlast des PKW berücksichtigen",
          "Pedelecs sollten wegen ihres hohen Gewichts möglichst mit einem Fahrradträger an der Rückseite des PKW befördert werden",
          "Pedelecs müssen mit Trägern befördert werden, die für das hohe Gewicht geeignet sind"
      ],
      "correct_answers": [
          "Wenn der Fahrradträger auf der Anhängekupplung montiert wird, muss ich die Stützlast des PKW berücksichtigen",
          "Pedelecs sollten wegen ihres hohen Gewichts möglichst mit einem Fahrradträger an der Rückseite des PKW befördert werden",
          "Pedelecs müssen mit Trägern befördert werden, die für das hohe Gewicht geeignet sind"
      ],
      "question_text_fa": "شما می‌خواهید با خودروی خود دوچرخه‌های الکتریکی (پدال‌برقی) را حمل کنید. در این زمینه چه نکاتی را باید رعایت کنید؟",
      "answers_fa": [
          "پدال‌برقی‌ها باید به دلیل وزن‌شان تا حد امکان بر روی سقف خودرو حمل شوند",
          "اگر باربند بر روی اتصال یدک نصب شده باشد، باید به وزن بار تکیه‌گاه خودروی خود توجه کنم",
          "پدال‌برقی‌ها باید به دلیل وزن بالایشان تا حد امکان با یک باربند در عقب خودرو حمل شوند",
          "پدال‌برقی‌ها باید با باربندهایی حمل شوند که برای وزن بالای آن‌ها مناسب است"
      ],
      "correct_answers_fa": [
          "اگر باربند بر روی اتصال یدک نصب شده باشد، باید به وزن بار تکیه‌گاه خودروی خود توجه کنم",
          "پدال‌برقی‌ها باید به دلیل وزن بالایشان تا حد امکان با یک باربند در عقب خودرو حمل شوند",
          "پدال‌برقی‌ها باید با باربندهایی حمل شوند که برای وزن بالای آن‌ها مناسب است"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1792",
      "question_text": "Sie wollen mit Ihrem PKW ein anderes Fahrzeug abschleppen. Was beachten Sie dabei?",
      "answers": [
          "Ich darf auf einer Autobahn oder Autostraße nur bis zur nächsten Ausfahrt abschleppen",
          "Ich muss darauf achten, dass ich beim Abschleppen die passende Art der Verbindung wähle",
          "Ich muss mich mit dem Lenker des anderen Fahrzeuges über die geplante Fahrtstrecke absprechen",
          "Ich darf auf einer Autobahn nur den Pannenstreifen benutzen"
      ],
      "correct_answers": [
          "Ich darf auf einer Autobahn oder Autostraße nur bis zur nächsten Ausfahrt abschleppen",
          "Ich muss darauf achten, dass ich beim Abschleppen die passende Art der Verbindung wähle",
          "Ich muss mich mit dem Lenker des anderen Fahrzeuges über die geplante Fahrtstrecke absprechen"
      ],
      "question_text_fa": "شما می‌خواهید با خودروی خود یک وسیله نقلیه دیگر را یدک بزنید. در این زمینه چه نکاتی را باید رعایت کنید؟",
      "answers_fa": [
          "من فقط مجاز به یدک زدن تا خروجی بعدی در بزرگراه یا جاده اصلی هستم",
          "باید توجه کنم که هنگام یدک زدن، نوع اتصال مناسب را انتخاب کنم",
          "باید با راننده وسیله نقلیه دیگر در مورد مسیر برنامه‌ریزی شده مشورت کنم",
          "من فقط می‌توانم از نوار توقف در بزرگراه استفاده کنم"
      ],
      "correct_answers_fa": [
          "من فقط مجاز به یدک زدن تا خروجی بعدی در بزرگراه یا جاده اصلی هستم",
          "باید توجه کنم که هنگام یدک زدن، نوع اتصال مناسب را انتخاب کنم",
          "باید با راننده وسیله نقلیه دیگر در مورد مسیر برنامه‌ریزی شده مشورت کنم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1793",
      "question_text": "Sie wollen mit Ihrem PKW ein anderes Fahrzeug abschleppen. Wie sollten Sie sich beim Abschleppvorgang verhalten?",
      "answers": [
          "Ich muss das Abblendlicht einschalten",
          "Ich sollte ruckartiges Anfahren oder Gas geben vermeiden",
          "Ich sollte starkes Abbremsen möglichst vermeiden",
          "Ich sollte das Einbiegen bei Kreuzungen möglichst vermeiden"
      ],
      "correct_answers": [
          "Ich muss das Abblendlicht einschalten",
          "Ich sollte ruckartiges Anfahren oder Gas geben vermeiden",
          "Ich sollte starkes Abbremsen möglichst vermeiden"
      ],
      "question_text_fa": "شما می‌خواهید با خودروی خود یک وسیله نقلیه دیگر را یدک بزنید. در هنگام یدک زدن باید چگونه رفتار کنید؟",
      "answers_fa": [
          "باید نورهای پایین را روشن کنم",
          "باید از شروع ناگهانی یا گاز دادن پرهیز کنم",
          "باید تا حد ممکن از ترمز شدید پرهیز کنم",
          "باید تا حد ممکن از ورود به پیچ‌ها در تقاطع‌ها پرهیز کنم"
      ],
      "correct_answers_fa": [
          "باید نورهای پایین را روشن کنم",
          "باید از شروع ناگهانی یا گاز دادن پرهیز کنم",
          "باید تا حد ممکن از ترمز شدید پرهیز کنم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1794",
      "question_text": "Ihr PKW hat einen Motorschaden. Welche sinnvolle(n) Möglichkeit(en) haben Sie, um das Fahrzeug zu entfernen?",
      "answers": [
          "Ein Abschleppseil",
          "Eine Abschleppstange",
          "Die Verladung auf einen Abschleppwagen oder Anhänger",
          "Mit einem Hilfsmotor"
      ],
      "correct_answers": [
          "Ein Abschleppseil",
          "Eine Abschleppstange",
          "Die Verladung auf einen Abschleppwagen oder Anhänger"
      ],
      "question_text_fa": "خودروی شما دچار خرابی موتوری شده است. چه راهکارهای مفید دیگری برای خارج کردن خودرو دارید؟",
      "answers_fa": [
          "یک بند یدک",
          "یک میله یدک",
          "بارگیری بر روی یک کامیون یدک یا تریلر",
          "با یک موتور کمکی"
      ],
      "correct_answers_fa": [
          "یک بند یدک",
          "یک میله یدک",
          "بارگیری بر روی یک کامیون یدک یا تریلر"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1795",
      "question_text": "Ihr PKW hat einen Motorschaden. Sie lassen sich von einem anderen PKW mit einem Seil abschleppen. Was beachten Sie dabei?",
      "answers": [
          "Ich muss mit wesentlich höheren Lenkkräften rechnen",
          "Ich muss das Bremspedal wesentlich stärker betätigen, um die gewohnte Bremswirkung zu erzielen",
          "Ich schalte im Freiland die Alarmblinkanlage ein",
          "Ich muss das Pannendreieck in das Heckfenster stellen"
      ],
      "correct_answers": [
          "Ich muss mit wesentlich höheren Lenkkräften rechnen",
          "Ich muss das Bremspedal wesentlich stärker betätigen, um die gewohnte Bremswirkung zu erzielen",
          "Ich schalte im Freiland die Alarmblinkanlage ein"
      ],
      "question_text_fa": "خودروی شما دچار خرابی موتوری شده است. شما با یک خودرو دیگر با یک بند یدک یدک می‌شوید. در این زمینه چه نکاتی را باید رعایت کنید؟",
      "answers_fa": [
          "باید انتظار داشته باشم که نیروهای فرمان‌پذیری به طور قابل توجهی افزایش یابد",
          "باید پدال ترمز را به طور قابل توجهی قوی‌تر فشار دهم تا اثر ترمز عادی حاصل شود",
          "باید در بیرون از شهر چراغ خطر را روشن کنم",
          "باید مثلث هشدار را در پنجره عقب قرار دهم"
      ],
      "correct_answers_fa": [
          "باید انتظار داشته باشم که نیروهای فرمان‌پذیری به طور قابل توجهی افزایش یابد",
          "باید پدال ترمز را به طور قابل توجهی قوی‌تر فشار دهم تا اثر ترمز عادی حاصل شود",
          "باید در بیرون از شهر چراغ خطر را روشن کنم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1800",
      "question_text": "Sie haben Ihren PKW eingeparkt. Was beachten Sie, wenn Sie den PKW verlassen?",
      "answers": [
          "Ich lege einen Gang bzw. die Wählhebelstellung \"P\" ein",
          "Ich sperre den PKW ab",
          "Ich sorge bei Dunkelheit für die Beleuchtung des PKW, außer er wäre aus ungefähr 50 m erkennbar",
          "Ich betätige die Handbremse"
      ],
      "correct_answers": [
          "Ich lege einen Gang bzw. die Wählhebelstellung \"P\" ein",
          "Ich sperre den PKW ab",
          "Ich sorge bei Dunkelheit für die Beleuchtung des PKW, außer er wäre aus ungefähr 50 m erkennbar",
          "Ich betätige die Handbremse"
      ],
      "question_text_fa": "شما خودروی خود را پارک کرده‌اید. هنگام ترک خودرو چه نکاتی را باید رعایت کنید؟",
      "answers_fa": [
          "یک دنده را در حالت قرار دهید یا انتخاب دنده \"P\" را بزنید",
          "خودرو را قفل کنید",
          "در تاریکی، باید نور خودرو را روشن کنید، مگر اینکه از حدود 50 متری قابل مشاهده باشد",
          "ترمز دستی را فعال کنم"
      ],
      "correct_answers_fa": [
          "یک دنده را در حالت قرار دهید یا انتخاب دنده \"P\" را بزنید",
          "خودرو را قفل کنید",
          "در تاریکی، باید نور خودرو را روشن کنید، مگر اینکه از حدود 50 متری قابل مشاهده باشد",
          "ترمز دستی را فعال کنم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "1801",
      "question_text": "Sie ziehen mit Ihrem PKW einen schweren Anhänger. Wie sichern Sie diese Fahrzeugkombination beim Parken in einem steilen Gefälle ab?",
      "answers": [
          "Ich lenke die Vorderräder zum Randstein",
          "Ich ziehe die Handbremsen von Zugfahrzeug und Anhänger an und lege zumindest einen Unterlegkeil vor die Räder des Anhängers",
          "Ich kupple den Anhänger ab und stelle ihn neben den PKW",
          "Es genügt, wenn ich einen Stein vor das rechte Vorderrad des PKW lege"
      ],
      "correct_answers": [
          "Ich lenke die Vorderräder zum Randstein",
          "Ich ziehe die Handbremsen von Zugfahrzeug und Anhänger an und lege zumindest einen Unterlegkeil vor die Räder des Anhängers"
      ],
      "question_text_fa": "شما با خودروی خود یک تریلر سنگین می‌کشید. هنگام پارک کردن این ترکیب خودرو چه نکاتی را باید رعایت کنید تا مطمئن شوید که در سراشیبی ایمن است؟",
      "answers_fa": [
          "چرخ‌های جلو را به سمت جدول هدایت می‌کنم",
          "ترمز دستی خودروی کشنده و تریلر را می‌کشم و حداقل یک زیرپایی جلوی چرخ‌های تریلر قرار می‌دهم",
          "تریلر را جدا می‌کنم و کنار خودرو می‌گذارم",
          "کافی است که یک سنگ جلوی چرخ جلویی سمت راست خودرو قرار دهم"
      ],
      "correct_answers_fa": [
          "چرخ‌های جلو را به سمت جدول هدایت می‌کنم",
          "ترمز دستی خودروی کشنده و تریلر را می‌کشم و حداقل یک زیرپایی جلوی چرخ‌های تریلر قرار می‌دهم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "2027",
      "question_text": "Sie fahren mit einem Klein-LKW. Bei einer Verkehrskontrolle wird das Fahrzeug samt Personen und Ladung abgewogen. Welche Gewichtsgrenzen des Fahrzeuges dürfen dabei nicht überschritten werden?",
      "answers": [
          "Das höchste zulässige Gesamtgewicht",
          "Die höchsten zulässigen Achslasten",
          "Die höchste zulässige Nutzlast",
          "Die höchste zulässige Motorlast"
      ],
      "correct_answers": [
          "Das höchste zulässige Gesamtgewicht",
          "Die höchsten zulässigen Achslasten",
          "Die höchste zulässige Nutzlast"
      ],
      "question_text_fa": "شما با یک کامیون کوچک در حال رانندگی هستید. در یک بازرسی ترافیکی، خودرو به همراه افراد و بار وزن‌کشی می‌شود. چه وزن‌هایی از خودرو نباید تجاوز کند؟",
      "answers_fa": [
          "حداکثر وزن مجاز کل",
          "حداکثر بار مجاز محورها",
          "حداکثر بار مجاز",
          "حداکثر بار مجاز موتور"
      ],
      "correct_answers_fa": [
          "حداکثر وزن مجاز کل",
          "حداکثر بار مجاز محورها",
          "حداکثر بار مجاز"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "2028",
      "question_text": "Sie beladen einen Klein-LKW. Worauf müssen Sie achten, damit die zulässigen Achslasten des Fahrzeuges nicht überschritten werden?",
      "answers": [
          "Dass das Gewicht der Ladung nicht höher als die höchste zulässige Nutzlast des Fahrzeuges ist",
          "Dass sich der Schwerpunkt der Ladung möglichst in der Mitte der Ladefläche befindet",
          "Dass die Ladung möglichst weit vorne steht",
          "Dass die Ladung möglichst weit hinten steht"
      ],
      "correct_answers": [
          "Dass das Gewicht der Ladung nicht höher als die höchste zulässige Nutzlast des Fahrzeuges ist",
          "Dass sich der Schwerpunkt der Ladung möglichst in der Mitte der Ladefläche befindet"
      ],
      "question_text_fa": "شما یک کامیون کوچک را بارگذاری می‌کنید. برای اینکه بار مجاز محورها تجاوز نکند، باید به چه نکاتی توجه کنید؟",
      "answers_fa": [
          "اینکه وزن بار بیشتر از حداکثر بار مجاز خودرو نباشد",
          "اینکه مرکز ثقل بار در میانه سطح بارگیری باشد",
          "اینکه بار به سمت جلو قرار گیرد",
          "اینکه بار به سمت عقب قرار گیرد"
      ],
      "correct_answers_fa": [
          "اینکه وزن بار بیشتر از حداکثر بار مجاز خودرو نباشد",
          "اینکه مرکز ثقل بار در میانه سطح بارگیری باشد"
      ],
      "category": "B - Rechtsvorschriften"
  },
  
  
  {
      "question_number": "2031",
      "question_text": "Sie fahren mit einem Kombi auf Urlaub und laden den Gepäckraum voll. Was beachten Sie beim Beladen?",
      "answers": [
          "Schwere Gegenstände lade ich nach unten, leichtere nach oben",
          "Ich achte darauf, dass die Ladung möglichst ohne Lücken geladen ist",
          "Ich sichere die Ladung mit einem Zurrnetz oder Zurrgurten",
          "Schwere Gegenstände lade ich am besten auf das Dach"
      ],
      "correct_answers": [
          "Schwere Gegenstände lade ich nach unten, leichtere nach oben",
          "Ich achte darauf, dass die Ladung möglichst ohne Lücken geladen ist",
          "Ich sichere die Ladung mit einem Zurrnetz oder Zurrgurten"
      ],
      "question_text_fa": "شما با یک خودروی استیشن به تعطیلات می‌روید و بار را به طور کامل بارگذاری می‌کنید. هنگام بارگذاری چه نکاتی را باید رعایت کنید؟",
      "answers_fa": [
          "اجسام سنگین را در پایین و اجسام سبک‌تر را در بالا بارگذاری می‌کنم",
          "توجه می‌کنم که بار به طور ممکن بدون فاصله بارگذاری شود",
          "بار را با یک شبکه یا بند ایمن می‌کنم",
          "اجسام سنگین را بهتر است بر روی سقف بارگذاری کنم"
      ],
      "correct_answers_fa": [
          "اجسام سنگین را در پایین و اجسام سبک‌تر را در بالا بارگذاری می‌کنم",
          "توجه می‌کنم که بار به طور ممکن بدون فاصله بارگذاری شود",
          "بار را با یک شبکه یا بند ایمن می‌کنم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "2043",
      "question_text": "Worauf achten Sie beim Beladen einer Dachbox?",
      "answers": [
          "Besonders schwere Gegenstände müssen in das hintere Ende der Dachbox geladen werden",
          "Ich sichere die Ladung innerhalb der Dachbox",
          "Ich kontrolliere vor Fahrtantritt, nach den ersten Kilometern Fahrt und nach jeder Fahrpause, ob Dachbox und Dachträger gut befestigt sind und die Dachbox richtig verschlossen ist",
          "Innerhalb einer Dachbox muss eine Ladung nie verzurrt werden"
      ],
      "correct_answers": [
          "Ich sichere die Ladung innerhalb der Dachbox",
          "Ich kontrolliere vor Fahrtantritt, nach den ersten Kilometern Fahrt und nach jeder Fahrpause, ob Dachbox und Dachträger gut befestigt sind und die Dachbox richtig verschlossen ist"
      ],
      "question_text_fa": "هنگام بارگذاری یک جعبه سقفی به چه نکاتی باید توجه کنید؟",
      "answers_fa": [
          "اجسام به خصوص سنگین باید به انتهای عقب جعبه سقفی بارگذاری شوند",
          "بار را درون جعبه سقفی ایمن می‌کنم",
          "قبل از حرکت، پس از چند کیلومتر رانندگی و پس از هر توقف، بررسی می‌کنم که آیا جعبه سقفی و باربند به خوبی محکم شده‌اند و جعبه سقفی به درستی بسته شده است",
          "درون یک جعبه سقفی بار هرگز نباید ایمن شود"
      ],
      "correct_answers_fa": [
          "بار را درون جعبه سقفی ایمن می‌کنم",
          "قبل از حرکت، پس از چند کیلومتر رانندگی و پس از هر توقف، بررسی می‌کنم که آیا جعبه سقفی و باربند به خوبی محکم شده‌اند و جعبه سقفی به درستی بسته شده است"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "2086",
      "question_text": "Worauf weist Sie dieses Verkehrszeichen hin?",
      "answers": [
          "In meiner Fahrtrichtung stehen zwei Fahrstreifen zur Verfügung, in 8 km sind es dann drei Fahrstreifen",
          "In meiner Fahrtrichtung stehen drei Fahrstreifen zur Verfügung",
          "Der linke Fahrstreifen darf in diesem Baustellenbereich nur von max. 2 m breiten Fahrzeugen benützt werden",
          "Ich fahre auf einer geteilten Richtungsfahrbahn"
      ],
      "correct_answers": [
          "In meiner Fahrtrichtung stehen drei Fahrstreifen zur Verfügung",
          "Der linke Fahrstreifen darf in diesem Baustellenbereich nur von max. 2 m breiten Fahrzeugen benützt werden"
      ],
      "question_text_fa": "این علامت ترافیکی به شما چه چیزی را نشان می‌دهد؟",
      "answers_fa": [
          "در مسیر حرکت من دو خط عبور در دسترس است، در 8 کیلومتر بعد سه خط عبور خواهد بود",
          "در مسیر حرکت من سه خط عبور در دسترس است",
          "خط عبور چپ فقط می‌تواند در این منطقه ساختمانی توسط وسایل نقلیه حداکثر 2 متر عرض استفاده شود",
          "من در یک جاده با دو طرفه رانندگی می‌کنم"
      ],
      "correct_answers_fa": [
          "در مسیر حرکت من سه خط عبور در دسترس است",
          "خط عبور چپ فقط می‌تواند در این منطقه ساختمانی توسط وسایل نقلیه حداکثر 2 متر عرض استفاده شود"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "2087",
      "question_text": "Wie können Sie die Breite Ihres Fahrzeugs ermitteln?",
      "answers": [
          "Ich kann in der Zulassungsbescheinigung nachsehen",
          "Ich kann in der Betriebsanleitung nachlesen",
          "Ich schaue in einem Verkaufsprospekt oder auf der Website des Herstellers nach",
          "Das muss im Innenraum des Fahrzeuges angeschrieben sein"
      ],
      "correct_answers": [
          "Ich kann in der Betriebsanleitung nachlesen",
          "Ich schaue in einem Verkaufsprospekt oder auf der Website des Herstellers nach"
      ],
      "question_text_fa": "چگونه می‌توانید عرض وسیله نقلیه خود را تعیین کنید؟",
      "answers_fa": [
          "می‌توانم در گواهی ثبت‌نام بررسی کنم",
          "می‌توانم در دفترچه راهنما مطالعه کنم",
          "به بروشور فروش یا وب‌سایت سازنده مراجعه می‌کنم",
          "باید در داخل وسیله نقلیه نوشته شده باشد"
      ],
      "correct_answers_fa": [
          "می‌توانم در دفترچه راهنما مطالعه کنم",
          "به بروشور فروش یا وب‌سایت سازنده مراجعه می‌کنم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "2110",
      "question_text": "Sie fahren mit Ihrem PKW. Welche Beleuchtung dürfen bzw. müssen Sie bei Tageslicht einschalten?",
      "answers": [
          "Ich darf mit Tagfahrlicht fahren, wenn keine Sichtbehinderung gegeben ist",
          "Ich darf mit Fernlicht fahren, wenn keine Sichtbehinderung gegeben ist",
          "Ich darf mit Abblendlicht fahren",
          "Ich darf in jedem Fall mit Begrenzungslicht alleine fahren"
      ],
      "correct_answers": [
          "Ich darf mit Tagfahrlicht fahren, wenn keine Sichtbehinderung gegeben ist",
          "Ich darf mit Fernlicht fahren, wenn keine Sichtbehinderung gegeben ist",
          "Ich darf mit Abblendlicht fahren"
      ],
      "question_text_fa": "شما با خودروی خود در حال رانندگی هستید. کدام چراغ‌ها را در روز می‌توانید یا باید روشن کنید؟",
      "answers_fa": [
          "می‌توانم با چراغ‌های روز حرکت کنم، اگر هیچ مانع دیدی وجود نداشته باشد",
          "می‌توانم با نور بالا حرکت کنم، اگر هیچ مانع دیدی وجود نداشته باشد",
          "می‌توانم با نور پایین حرکت کنم",
          "می‌توانم در هر صورت فقط با چراغ‌های جانبی حرکت کنم"
      ],
      "correct_answers_fa": [
          "می‌توانم با چراغ‌های روز حرکت کنم، اگر هیچ مانع دیدی وجود نداشته باشد",
          "می‌توانم با نور بالا حرکت کنم، اگر هیچ مانع دیدی وجود نداشته باشد",
          "می‌توانم با نور پایین حرکت کنم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "2111",
      "question_text": "Warum ist es sinnvoll, auch am Tag mit Licht zu fahren?",
      "answers": [
          "Weil andere Verkehrsteilnehmer mein Fahrzeug früher erkennen können",
          "Weil ich entgegenkommende Fahrzeuge früher erkennen kann, wenn diese mit Licht fahren",
          "Weil besonders gefährdete Verkehrsteilnehmer, wie Kinder und ältere Personen, mein Fahrzeug früher erkennen können",
          "Ich darf mit höherer Geschwindigkeit fahren, weil ich besser gesehen werde"
      ],
      "correct_answers": [
          "Weil andere Verkehrsteilnehmer mein Fahrzeug früher erkennen können",
          "Weil ich entgegenkommende Fahrzeuge früher erkennen kann, wenn diese mit Licht fahren",
          "Weil besonders gefährdete Verkehrsteilnehmer, wie Kinder und ältere Personen, mein Fahrzeug früher erkennen können"
      ],
      "question_text_fa": "چرا منطقی است که حتی در روز با چراغ روشن رانندگی کنیم؟",
      "answers_fa": [
          "زیرا دیگر کاربران جاده می‌توانند وسیله نقلیه من را زودتر تشخیص دهند",
          "زیرا می‌توانم وسایل نقلیه مقابل را زودتر تشخیص دهم اگر آن‌ها با چراغ حرکت کنند",
          "زیرا کاربران آسیب‌پذیر جاده مانند کودکان و سالمندان وسیله نقلیه من را زودتر تشخیص می‌دهند",
          "می‌توانم با سرعت بیشتری حرکت کنم زیرا بهتر دیده می‌شوم"
      ],
      "correct_answers_fa": [
          "زیرا دیگر کاربران جاده می‌توانند وسیله نقلیه من را زودتر تشخیص دهند",
          "زیرا می‌توانم وسایل نقلیه مقابل را زودتر تشخیص دهم اگر آن‌ها با چراغ حرکت کنند",
          "زیرا کاربران آسیب‌پذیر جاده مانند کودکان و سالمندان وسیله نقلیه من را زودتر تشخیص می‌دهند"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "2536",
      "question_text": "Welche Möglichkeiten kennen Sie, um die Parkgebühr zu entrichten?",
      "answers": [
          "Die Gebühr kann bei Automaten bezahlt werden",
          "Es gibt Smartphone-Apps, um die Parkgebühr zu bezahlen",
          "Es gibt kostenpflichtige Parkscheine zum Ausfüllen der Ankunftszeit",
          "Anrainer können die Parkgebühr pauschal entrichten und bekommen einen Berechtigungs-Aufkleber für ihr Auto"
      ],
      "correct_answers": [
          "Die Gebühr kann bei Automaten bezahlt werden",
          "Es gibt Smartphone-Apps, um die Parkgebühr zu bezahlen",
          "Es gibt kostenpflichtige Parkscheine zum Ausfüllen der Ankunftszeit",
          "Anrainer können die Parkgebühr pauschal entrichten und bekommen einen Berechtigungs-Aufkleber für ihr Auto"
      ],
      "question_text_fa": "چه روش‌هایی برای پرداخت هزینه پارکینگ می‌شناسید؟",
      "answers_fa": [
          "هزینه می‌تواند در دستگاه‌های خودپرداز پرداخت شود",
          "اپلیکیشن‌های گوشی هوشمند برای پرداخت هزینه پارکینگ وجود دارد",
          "برچسب‌های پارکینگ پرداختی برای ثبت زمان ورود موجود است",
          "ساکنین می‌توانند هزینه پارک را به صورت ثابت پرداخت کنند و برچسب مجوز برای خودرو خود دریافت کنند"
      ],
      "correct_answers_fa": [
          "هزینه می‌تواند در دستگاه‌های خودپرداز پرداخت شود",
          "اپلیکیشن‌های گوشی هوشمند برای پرداخت هزینه پارکینگ وجود دارد",
          "برچسب‌های پارکینگ پرداختی برای ثبت زمان ورود موجود است",
          "ساکنین می‌توانند هزینه پارک را به صورت ثابت پرداخت کنند و برچسب مجوز برای خودرو خود دریافت کنند"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "2537",
      "question_text": "Sie wollen Ihren PKW in dieser Kurzparkzone an einem Werktag von 18:50 Uhr bis 23:30 Uhr abstellen. Wie verhalten Sie sich?",
      "answers": [
          "Da angefangene Viertelstunden nicht berücksichtigt werden, muss ich keine Gebühr entrichten",
          "Wenn es in dieser Gemeinde einen kostenlosen 15-Minuten-Parkschein gibt, kann ich diesen ausfüllen",
          "Ich muss eine Parkgebühr entrichten, wenn es in dieser Gemeinde keinen Gratis-Parkschein für 15 Minuten gibt",
          "Bis zum Ende der Kurzparkdauer gilt das Abstellen meines Fahrzeuges noch als halten. Ich muss daher nichts tun"
      ],
      "correct_answers": [
          "Wenn es in dieser Gemeinde einen kostenlosen 15-Minuten-Parkschein gibt, kann ich diesen ausfüllen",
          "Ich muss eine Parkgebühr entrichten, wenn es in dieser Gemeinde keinen Gratis-Parkschein für 15 Minuten gibt"
      ],
      "question_text_fa": "شما می‌خواهید خودروی خود را در این منطقه پارک کوتاه‌مدت در یک روز کاری از ساعت 18:50 تا 23:30 پارک کنید. چه کار می‌کنید؟",
      "answers_fa": [
          "از آنجا که یک چهارم ساعت شروع حساب نمی‌شود، نیازی به پرداخت هزینه ندارم",
          "اگر در این منطقه برگه پارک رایگان 15 دقیقه‌ای وجود داشته باشد، می‌توانم آن را پر کنم",
          "اگر در این منطقه برگه پارک رایگان 15 دقیقه‌ای وجود نداشته باشد، باید هزینه پارک را پرداخت کنم",
          "تا پایان مدت پارک کوتاه، پارک کردن خودروی من به عنوان توقف در نظر گرفته می‌شود و نیازی به هیچ اقدامی ندارم"
      ],
      "correct_answers_fa": [
          "اگر در این منطقه برگه پارک رایگان 15 دقیقه‌ای وجود داشته باشد، می‌توانم آن را پر کنم",
          "اگر در این منطقه برگه پارک رایگان 15 دقیقه‌ای وجود نداشته باشد، باید هزینه پارک را پرداخت کنم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "2692",
      "question_text": "Welche Kraftfahrzeuge dürfen Sie mit dem Führerschein der Klasse B lenken?",
      "answers": [
          "Ein- und mehrspurige Motorfahrräder (\"Mopeds\")",
          "Quads",
          "Alle Motorräder bis 125 cm3 Hubraum",
          "Lastkraftwagen, die nicht mehr als 3.500 kg höchstes zulässiges Gesamtgewicht haben"
      ],
      "correct_answers": [
          "Ein- und mehrspurige Motorfahrräder (\"Mopeds\")",
          "Quads",
          "Lastkraftwagen, die nicht mehr als 3.500 kg höchstes zulässiges Gesamtgewicht haben"
      ],
      "question_text_fa": "با گواهینامه کلاس B، چه وسایل نقلیه موتوری را می‌توانید هدایت کنید؟",
      "answers_fa": [
          "دوچرخه‌های موتوری یک و چند محور (\"موتورسیکلت\")",
          "کوادها",
          "تمام موتورسیکلت‌ها تا حجم 125 سی‌سی",
          "کامیون‌هایی که بیش از 3500 کیلوگرم وزن مجاز کل ندارند"
      ],
      "correct_answers_fa": [
          "دوچرخه‌های موتوری یک و چند محور (\"موتورسیکلت\")",
          "کوادها",
          "کامیون‌هایی که بیش از 3500 کیلوگرم وزن مجاز کل ندارند"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "2693",
      "question_text": "Welche Ausrüstungsgegenstände müssen Sie als Lenker eines Quads mitführen?",
      "answers": [
          "Ein Pannendreieck",
          "Eine Warnweste",
          "Verbandszeug",
          "Ein Reserverad"
      ],
      "correct_answers": [
          "Ein Pannendreieck",
          "Eine Warnweste",
          "Verbandszeug"
      ],
      "question_text_fa": "چه تجهیزاتی باید به عنوان راننده یک کواد همراه داشته باشید؟",
      "answers_fa": [
          "مثلث هشدار",
          "جلیقه هشدار",
          "جعبه کمک‌های اولیه",
          "چرخ یدکی"
      ],
      "correct_answers_fa": [
          "مثلث هشدار",
          "جلیقه هشدار",
          "جعبه کمک‌های اولیه"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "2694",
      "question_text": "Dürfen Sie mit der Lenkberechtigung der Klasse B einspurige Kraftfahrzeuge lenken?",
      "answers": [
          "Ich darf Motorfahrräder (Mopeds) lenken",
          "Nach einer zusätzlichen Ausbildung darf ich in Österreich Motorräder bis 125 cm3 Hubraum lenken",
          "Ich darf mit der Klasse B innerhalb der EU Motorräder bis 125 cm3 Hubraum lenken",
          "Nein, ich darf mit der Klasse B nur PKW, Kombis und vierrädrige Leichtkraftfahrzeuge (Mopedautos) lenken"
      ],
      "correct_answers": [
          "Ich darf Motorfahrräder (Mopeds) lenken",
          "Nach einer zusätzlichen Ausbildung darf ich in Österreich Motorräder bis 125 cm3 Hubraum lenken"
      ],
      "question_text_fa": "آیا می‌توانید با گواهینامه کلاس B وسایل نقلیه موتوری یک‌محور را هدایت کنید؟",
      "answers_fa": [
          "می‌توانم موتورسیکلت‌های سبک (موتورسیکلت‌ها) را هدایت کنم",
          "پس از یک آموزش اضافی، می‌توانم در اتریش موتورسیکلت‌هایی با حجم موتور تا 125 سی‌سی هدایت کنم",
          "می‌توانم با کلاس B در داخل اتحادیه اروپا موتورسیکلت‌هایی با حجم موتور تا 125 سی‌سی هدایت کنم",
          "نه، فقط می‌توانم با کلاس B خودروهای سواری، استیشن و وسایل نقلیه سبک چهارچرخ (خودروهای موتورسیکلت) را هدایت کنم"
      ],
      "correct_answers_fa": [
          "می‌توانم موتورسیکلت‌های سبک (موتورسیکلت‌ها) را هدایت کنم",
          "پس از یک آموزش اضافی، می‌توانم در اتریش موتورسیکلت‌هایی با حجم موتور تا 125 سی‌سی هدایت کنم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "2695",
      "question_text": "Sie lenken ein einspuriges Moped. Müssen Sie dabei einen Sturzhelm tragen?",
      "answers": [
          "Ja, immer",
          "Ja, aber nur auf Autobahnen und Autostraßen",
          "Nur wenn ich schneller als 50 km/h fahre",
          "Nein, nie"
      ],
      "correct_answers": [
          "Ja, immer"
      ],
      "question_text_fa": "آیا باید هنگام رانندگی با یک موتورسیکلت سبک کلاه ایمنی بپوشید؟",
      "answers_fa": [
          "بله، همیشه",
          "بله، اما فقط در بزرگراه‌ها و راه‌های ماشین‌رو",
          "فقط وقتی که سرعت بیش از 50 کیلومتر در ساعت است",
          "نه، هرگز"
      ],
      "correct_answers_fa": [
          "بله، همیشه"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "2704",
      "question_text": "Sie fahren mit Ihrem mehrspurigen Kraftfahrzeug. Wie verhalten Sie sich, wenn Sie die Nebelzone im Tal erreichen?",
      "answers": [
          "Ich passe meine Fahrgeschwindigkeit der schlechter werdenden Sichtweite an",
          "Ich fahre in jedem Fall auf halbe Sicht",
          "Ich schalte eine passende Lichtstufe ein",
          "Ich fahre in jedem Fall auf Gefahrensicht"
      ],
      "correct_answers": [
          "Ich passe meine Fahrgeschwindigkeit der schlechter werdenden Sichtweite an",
          "Ich schalte eine passende Lichtstufe ein"
      ],
      "question_text_fa": "شما با خودروی چند محور خود رانندگی می‌کنید. وقتی به منطقه مه در دره می‌رسید، چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "سرعتم را با توجه به کاهش دید تنظیم می‌کنم",
          "همیشه با نصف دید رانندگی می‌کنم",
          "یک درجه نور مناسب را روشن می‌کنم",
          "همیشه با دید خطر رانندگی می‌کنم"
      ],
      "correct_answers_fa": [
          "سرعتم را با توجه به کاهش دید تنظیم می‌کنم",
          "یک درجه نور مناسب را روشن می‌کنم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "2705",
      "question_text": "Sie fahren mit Ihrem mehrspurigen Kraftfahrzeug. Worauf müssen Sie besonders achten, wenn es während der Fahrt nebelig wird?",
      "answers": [
          "Ich muss bei der Wahl der Fahrgeschwindigkeit die eingeschränkte Sichtweite und die veränderten Fahrbahnverhältnisse berücksichtigen",
          "Ich schalte Abblendlicht, Nebellicht oder beides ein",
          "Wenn ich hinter einem anderen Fahrzeug nachfahre, halte ich einen größeren Sicherheitsabstand als normal ein",
          "Ich achte auf Fußgänger, die am Bankett gehen"
      ],
      "correct_answers": [
          "Ich muss bei der Wahl der Fahrgeschwindigkeit die eingeschränkte Sichtweite und die veränderten Fahrbahnverhältnisse berücksichtigen",
          "Ich schalte Abblendlicht, Nebellicht oder beides ein",
          "Wenn ich hinter einem anderen Fahrzeug nachfahre, halte ich einen größeren Sicherheitsabstand als normal ein"
      ],
      "question_text_fa": "شما با خودروی چند محور خود رانندگی می‌کنید. وقتی در طول رانندگی مه آلود می‌شود، باید به چه نکاتی توجه کنید؟",
      "answers_fa": [
          "باید هنگام انتخاب سرعت به دید محدود و شرایط متغیر جاده توجه کنم",
          "چراغ‌های پایین، چراغ‌های مه یا هر دو را روشن می‌کنم",
          "اگر پشت یک وسیله نقلیه دیگر هستم، فاصله ایمنی بیشتری نسبت به حالت عادی حفظ می‌کنم",
          "به عابران پیاده‌ای که در کناره جاده راه می‌روند توجه می‌کنم"
      ],
      "correct_answers_fa": [
          "باید هنگام انتخاب سرعت به دید محدود و شرایط متغیر جاده توجه کنم",
          "چراغ‌های پایین، چراغ‌های مه یا هر دو را روشن می‌کنم",
          "اگر پشت یک وسیله نقلیه دیگر هستم، فاصله ایمنی بیشتری نسبت به حالت عادی حفظ می‌کنم"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "2712",
      "question_text": "Dürfen Sie auf diesem Fahrstreifen weiterfahren?",
      "answers": [
          "Nur solang ich überhole",
          "Nein",
          "Nur wenn ich links einbiegen will",
          "Ja"
      ],
      "correct_answers": [
          "Ja"
      ],
      "question_text_fa": "آیا می‌توانید در این لاین ادامه دهید؟",
      "answers_fa": [
          "فقط وقتی که سبقت می‌گیرم",
          "نه",
          "فقط وقتی که می‌خواهم به چپ بپیچم",
          "بله"
      ],
      "correct_answers_fa": [
          "بله"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2713",
      "question_text": "Darf die rechte Kolonne schneller fahren als die linke?",
      "answers": [
          "Nein",
          "Nur im Ortsgebiet",
          "Ja",
          "Nur auf Vorrangstraßen"
      ],
      "correct_answers": [
          "Ja"
      ],
      "question_text_fa": "آیا لاین سمت راست می‌تواند سریع‌تر از لاین سمت چپ حرکت کند؟",
      "answers_fa": [
          "نه",
          "فقط در محدوده شهری",
          "بله",
          "فقط در جاده‌های اولویت‌دار"
      ],
      "correct_answers_fa": [
          "بله"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "494",
      "question_text": "Sie fahren mit einem Klein-LKW und ziehen damit einen Anhänger. Dürfen Sie weiterfahren?",
      "answers": [
          "Nein",
          "Ja, wenn ich einen schweren Anhänger ziehe",
          "Ja, wenn ich einen leichten Anhänger ziehe",
          "Ja, wenn ich einen nicht zum Verkehr zugelassenen Anhänger ziehe"
      ],
      "correct_answers": [
          "Nein"
      ],
      "question_text_fa": "شما با یک کامیون کوچک رانندگی می‌کنید و یک تریلر را می‌کشید. آیا می‌توانید ادامه دهید؟",
      "answers_fa": [
          "نه",
          "بله، اگر یک تریلر سنگین می‌کشم",
          "بله، اگر یک تریلر سبک می‌کشم",
          "بله، اگر یک تریلر غیر مجاز برای ترافیک می‌کشم"
      ],
      "correct_answers_fa": [
          "نه"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "495",
      "question_text": "Sie fahren mit einem PKW und ziehen damit einen Anhänger. Dürfen Sie weiterfahren?",
      "answers": [
          "Nein",
          "Ja, aber nur dann, wenn ich einen nicht zum Verkehr zugelassenen Anhänger ziehe",
          "Ja",
          "Ja, aber nur dann, wenn der Anhänger nur eine Achse hat"
      ],
      "correct_answers": [
          "Ja"
      ],
      "question_text_fa": "شما با یک خودرو شخصی رانندگی می‌کنید و یک تریلر را می‌کشید. آیا می‌توانید ادامه دهید؟",
      "answers_fa": [
          "نه",
          "بله، اما فقط در صورتی که یک تریلر غیر مجاز برای ترافیک می‌کشم",
          "بله",
          "بله، اما فقط در صورتی که تریلر تنها یک محور داشته باشد"
      ],
      "correct_answers_fa": [
          "بله"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "562",
      "question_text": "Sie ziehen mit Ihrem PKW einen Anhänger. Wie verhalten Sie sich bei diesem Verkehrszeichen?",
      "answers": [
          "Ich fahre nur weiter, wenn ich einen leichten Anhänger ziehe",
          "Ich fahre nur weiter, wenn ich einen einachsigen Anhänger ziehe",
          "Ich fahre nur weiter, wenn ich einen nicht zum Verkehr zugelassenen Anhänger ziehe",
          "Ich fahre nicht weiter"
      ],
      "correct_answers": [
          "Ich fahre nicht weiter"
      ],
      "question_text_fa": "شما با خودروی خود یک تریلر را می‌کشید. چگونه با این علامت ترافیکی رفتار می‌کنید؟",
      "answers_fa": [
          "فقط در صورتی که یک تریلر سبک می‌کشم ادامه می‌دهم",
          "فقط در صورتی که یک تریلر تک محور می‌کشم ادامه می‌دهم",
          "فقط در صورتی که یک تریلر غیر مجاز برای ترافیک می‌کشم ادامه می‌دهم",
          "ادامه نمی‌دهم"
      ],
      "correct_answers_fa": [
          "ادامه نمی‌دهم"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
  "question_number": "563",
  "question_text": "Sie wollen Ihren Anhänger abstellen, weil Sie damit nicht weiterfahren dürfen. Worauf müssen Sie dabei achten?",
  "answers": [
      "Dass der Anhänger nur am rechten Fahrbahnrand abgestellt werden darf",
      "Dass der Anhänger nicht auf der Fahrbahn steht",
      "Dass die Deichsel des Anhängers nach oben gerichtet ist",
      "Dass die Deichsel des Anhängers mit einem Schloss gesichert ist"
  ],
  "correct_answers": [
      "Dass der Anhänger nicht auf der Fahrbahn steht"
  ],
  "question_text_fa": "شما قصد دارید تریلر خود را پارک کنید زیرا نمی‌توانید به رانندگی ادامه دهید. به چه مواردی باید توجه کنید؟",
  "answers_fa": [
      "اینکه تریلر فقط باید در لبه سمت راست جاده پارک شود",
      "اینکه تریلر نباید روی جاده پارک شود",
      "اینکه قسمت اتصال تریلر به سمت بالا باشد",
      "اینکه قسمت اتصال تریلر با یک قفل ایمن شود"
  ],
  "correct_answers_fa": [
      "اینکه تریلر نباید روی جاده پارک شود"
  ],
  "category": "B - Personenbeförderung, Ladung, Anhänger"
}
,
  {
      "question_number": "724",
      "question_text": "Sie fahren mit einem Wohnwagengespann auf einer Freilandstraße. Welchen Abstand müssen Sie zum LKW mit Anhänger vor Ihnen einhalten, wenn Sie nicht überholen wollen?",
      "answers": [
          "Mindestens 10 m",
          "Mindestens 20 m",
          "Mindestens 50 m",
          "Mindestens 100 m"
      ],
      "correct_answers": [
          "Mindestens 50 m"
      ],
      "question_text_fa": "شما با یک کاروان در یک جاده آزاد رانندگی می‌کنید. چه فاصله‌ای باید با کامیون دارای تریلر در جلوی خود حفظ کنید، اگر قصد سبقت گرفتن ندارید؟",
      "answers_fa": [
          "حداقل 10 متر",
          "حداقل 20 متر",
          "حداقل 50 متر",
          "حداقل 100 متر"
      ],
      "correct_answers_fa": [
          "حداقل 50 متر"
      ],
      "category": "B - Rechtsvorschriften"
  },
  {
      "question_number": "725",
      "question_text": "Warum muss zwischen Fahrzeugen mit größeren Längsabmessungen im Freiland ein Mindestabstand von 50 m eingehalten werden?",
      "answers": [
          "Damit andere Kraftfahrzeuge leichter überholen können",
          "Damit keine Ermüdung der Lenkerinnen und Lenker eintritt",
          "Weil das vorausfahrende lange Fahrzeug einen längeren Bremsweg hat",
          "Damit sich nicht so leicht Kolonnen bilden, weil andere Kraftfahrzeuge leichter überholen können"
      ],
      "correct_answers": [
          "Damit andere Kraftfahrzeuge leichter überholen können",
          "Damit sich nicht so leicht Kolonnen bilden, weil andere Kraftfahrzeuge leichter überholen können"
      ],
      "question_text_fa": "چرا باید بین وسایل نقلیه با ابعاد طولی بزرگ‌تر در خارج از شهر حداقل فاصله ۵۰ متر رعایت شود؟",
      "answers_fa": [
          "تا وسایل نقلیه دیگر بتوانند راحت‌تر سبقت بگیرند",
          "برای جلوگیری از خستگی رانندگان",
          "زیرا وسیله نقلیه طولانی جلویی مسیر ترمز طولانی‌تری دارد",
          "تا به راحتی صف تشکیل نشود و وسایل نقلیه دیگر بتوانند راحت‌تر سبقت بگیرند"
      ],
      "correct_answers_fa": [
          "تا وسایل نقلیه دیگر بتوانند راحت‌تر سبقت بگیرند",
          "تا به راحتی صف تشکیل نشود و وسایل نقلیه دیگر بتوانند راحت‌تر سبقت بگیرند"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  }
  ,
  {
      "question_number": "726",
      "question_text": "Sie fahren mit Ihrem Wohnwagengespann mit 80 km/h. Warum reicht hier der Mindestabstand von 50 m zwischen Fahrzeugen mit größeren Längsabmessungen nicht aus?",
      "answers": [
          "Weil starker Verkehr herrscht",
          "Weil die Fahrbahn zu schmal ist",
          "Weil durch die Witterung der erforderliche Sicherheitsabstand größer ist",
          "Weil der Mindestabstand von 50 m auf Autobahnen immer zu gering ist"
      ],
      "correct_answers": [
          "Weil durch die Witterung der erforderliche Sicherheitsabstand größer ist"
      ],
      "question_text_fa": "شما با کاروان خود با سرعت 80 کیلومتر در ساعت رانندگی می‌کنید. چرا حداقل فاصله 50 متر برای خودروهایی با ابعاد طولی بزرگ‌تر کافی نیست؟",
      "answers_fa": [
          "زیرا ترافیک سنگین است",
          "زیرا جاده خیلی باریک است",
          "زیرا به دلیل شرایط آب و هوایی فاصله ایمنی باید بیشتر باشد",
          "زیرا حداقل فاصله 50 متر در بزرگراه‌ها همیشه کافی نیست"
      ],
      "correct_answers_fa": [
          "زیرا به دلیل شرایط آب و هوایی فاصله ایمنی باید بیشتر باشد"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1400",
      "question_text": "Sie wollen in einem Kraftwagen ein 3-jähriges Kind befördern. Was müssen Sie dabei beachten?",
      "answers": [
          "Dass das Kind mit einem dem Körpergewicht angepassten Kinderrückhaltesystem befördert wird",
          "Dass das Kind mit dem Gurt für Erwachsene gesichert ist",
          "Dass das Kind über eine eigene Fahrzeugtüre einsteigen kann",
          "Dass das Kind mit einem der Körpergröße angepassten Kinderrückhaltesystem befördert wird"
      ],
      "correct_answers": [
          "Dass das Kind mit einem dem Körpergewicht angepassten Kinderrückhaltesystem befördert wird",
          "Dass das Kind mit einem der Körpergröße angepassten Kinderrückhaltesystem befördert wird"
      ],
      "question_text_fa": "شما می‌خواهید یک کودک 3 ساله را در خودروی خود حمل کنید. به چه نکاتی باید توجه کنید؟",
      "answers_fa": [
          "اینکه کودک با یک سیستم نگهداری کودک مناسب با وزن بدنش حمل شود",
          "اینکه کودک با کمربند ایمنی بزرگسالان ایمن شده باشد",
          "اینکه کودک بتواند از درب مخصوص خود وارد خودرو شود",
          "اینکه کودک با یک سیستم نگهداری کودک مناسب با قد او حمل شود"
      ],
      "correct_answers_fa": [
          "اینکه کودک با یک سیستم نگهداری کودک مناسب با وزن بدنش حمل شود",
          "اینکه کودک با یک سیستم نگهداری کودک مناسب با قد او حمل شود"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1401",
      "question_text": "Was müssen Sie bei der Auswahl eines Kinderrückhaltesystems für Kraftwagen beachten?",
      "answers": [
          "Kinderrückhaltesysteme müssen mit einem ECE-Prüfzeichen versehen sein",
          "Kinderrückhaltesysteme müssen der Größe und dem Körpergewicht des Kindes entsprechen",
          "Ich muss prüfen, ob das Kinderrückhaltesystem für mein Fahrzeug geeignet ist",
          "Das verwendete Kinderrückhaltesystem muss möglichst fest mit dem Fahrzeug verbunden werden können"
      ],
      "correct_answers": [
          "Kinderrückhaltesysteme müssen mit einem ECE-Prüfzeichen versehen sein",
          "Kinderrückhaltesysteme müssen der Größe und dem Körpergewicht des Kindes entsprechen",
          "Ich muss prüfen, ob das Kinderrückhaltesystem für mein Fahrzeug geeignet ist",
          "Das verwendete Kinderrückhaltesystem muss möglichst fest mit dem Fahrzeug verbunden werden können"
      ],
      "question_text_fa": "چه چیزی را باید در انتخاب سیستم نگهدارنده کودک برای خودرو در نظر بگیرید؟",
      "answers_fa": [
          "سیستم‌های نگهدارنده کودک باید دارای نشان استاندارد ECE باشند",
          "سیستم‌های نگهدارنده کودک باید با اندازه و وزن کودک مطابقت داشته باشند",
          "من باید بررسی کنم که آیا سیستم نگهدارنده کودک برای خودروی من مناسب است",
          "سیستم نگهدارنده کودک باید به طور محکم با خودرو اتصال یابد"
      ],
      "correct_answers_fa": [
          "سیستم‌های نگهدارنده کودک باید دارای نشان استاندارد ECE باشند",
          "سیستم‌های نگهدارنده کودک باید با اندازه و وزن کودک مطابقت داشته باشند",
          "من باید بررسی کنم که آیا سیستم نگهدارنده کودک برای خودروی من مناسب است",
          "سیستم نگهدارنده کودک باید به طور محکم با خودرو اتصال یابد"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  }
  ,
  {
      "question_number": "1403",
      "question_text": "Sie wollen ein 6 Monate altes Kind in einem Kraftwagen befördern. Was beachten Sie dabei?",
      "answers": [
          "Ich verwende ein dem Körpergewicht und der Körpergröße angepasstes Rückhaltesystem",
          "Ich kann einen rückwärtsgerichteten Kindersitz auf dem Beifahrersitz verwenden, wenn dort kein Frontairbag aktiv ist",
          "Ich verwende die Erwachsenengurte",
          "Ich verwende ein Sitzpolster"
      ],
      "correct_answers": [
          "Ich verwende ein dem Körpergewicht und der Körpergröße angepasstes Rückhaltesystem",
          "Ich kann einen rückwärtsgerichteten Kindersitz auf dem Beifahrersitz verwenden, wenn dort kein Frontairbag aktiv ist"
      ],
      "question_text_fa": "شما می‌خواهید یک کودک 6 ماهه را در خودروی خود حمل کنید. به چه نکاتی باید توجه کنید؟",
      "answers_fa": [
          "از یک سیستم نگهداری متناسب با وزن و قد کودک استفاده می‌کنم",
          "می‌توانم از یک صندلی کودک رو به عقب در صندلی جلو استفاده کنم، به شرطی که کیسه هوای جلو فعال نباشد",
          "از کمربندهای ایمنی بزرگسالان استفاده می‌کنم",
          "از یک بالشتک صندلی استفاده می‌کنم"
      ],
      "correct_answers_fa": [
          "از یک سیستم نگهداری متناسب با وزن و قد کودک استفاده می‌کنم",
          "می‌توانم از یک صندلی کودک رو به عقب در صندلی جلو استفاده کنم، به شرطی که کیسه هوای جلو فعال نباشد"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1404",
      "question_text": "Was müssen Sie bei der Auswahl eines Kinderrückhaltesystems für Kraftwagen beachten?",
      "answers": [
          "Kinderrückhaltesysteme müssen mit einem ECE-Prüfzeichen versehen sein",
          "Kinderrückhaltesysteme müssen der Größe und dem Körpergewicht des Kindes entsprechen",
          "Das verwendete Kinderrückhaltesystem muss möglichst fest mit dem Fahrzeug verbunden werden können",
          "Ich muss prüfen, ob das Kinderrückhaltesystem für mein Fahrzeug geeignet ist"
      ],
      "correct_answers": [
          "Kinderrückhaltesysteme müssen mit einem ECE-Prüfzeichen versehen sein",
          "Kinderrückhaltesysteme müssen der Größe und dem Körpergewicht des Kindes entsprechen",
          "Das verwendete Kinderrückhaltesystem muss möglichst fest mit dem Fahrzeug verbunden werden können",
          "Ich muss prüfen, ob das Kinderrückhaltesystem für mein Fahrzeug geeignet ist"
      ],
      "question_text_fa": "چه چیزی را باید در انتخاب سیستم نگهدارنده کودک برای خودرو در نظر بگیرید؟",
      "answers_fa": [
          "سیستم‌های نگهدارنده کودک باید دارای نشان استاندارد ECE باشند",
          "سیستم‌های نگهدارنده کودک باید با اندازه و وزن کودک مطابقت داشته باشند",
          "سیستم نگهدارنده کودک باید به طور محکم با خودرو اتصال یابد",
          "من باید بررسی کنم که آیا سیستم نگهدارنده کودک برای خودروی من مناسب است"
      ],
      "correct_answers_fa": [
          "سیستم‌های نگهدارنده کودک باید دارای نشان استاندارد ECE باشند",
          "سیستم‌های نگهدارنده کودک باید با اندازه و وزن کودک مطابقت داشته باشند",
          "سیستم نگهدارنده کودک باید به طور محکم با خودرو اتصال یابد",
          "من باید بررسی کنم که آیا سیستم نگهدارنده کودک برای خودروی من مناسب است"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  }
  ,
  {
      "question_number": "1407",
      "question_text": "Sie wollen ein 11-jähriges Kind auf dem Vordersitz eines PKW befördern. Was beachten Sie dabei?",
      "answers": [
          "Wenn das Kind kleiner als 135 cm ist, sichere ich es mit einem geeigneten Kinderrückhaltesystem",
          "Wenn das Kind 135 cm oder größer ist, sorge ich dafür, dass es den Sicherheitsgurt korrekt verwendet",
          "Ich sorge dafür, dass der Airbag ausgeschaltet ist",
          "Ich muss für eine auffällige Kleidung des Kindes sorgen"
      ],
      "correct_answers": [
          "Wenn das Kind kleiner als 135 cm ist, sichere ich es mit einem geeigneten Kinderrückhaltesystem",
          "Wenn das Kind 135 cm oder größer ist, sorge ich dafür, dass es den Sicherheitsgurt korrekt verwendet"
      ],
      "question_text_fa": "شما می‌خواهید یک کودک 11 ساله را در صندلی جلوی یک خودرو سواری حمل کنید. به چه نکاتی باید توجه کنید؟",
      "answers_fa": [
          "اگر کودک کمتر از 135 سانتیمتر است، او را با یک سیستم نگهداری مناسب ایمن می‌کنم",
          "اگر کودک 135 سانتیمتر یا بیشتر است، مطمئن می‌شوم که کمربند ایمنی به درستی استفاده شود",
          "مطمئن می‌شوم که کیسه هوا غیرفعال شده است",
          "باید از لباس‌های جلب توجه کودک اطمینان حاصل کنم"
      ],
      "correct_answers_fa": [
          "اگر کودک کمتر از 135 سانتیمتر است، او را با یک سیستم نگهداری مناسب ایمن می‌کنم",
          "اگر کودک 135 سانتیمتر یا بیشتر است، مطمئن می‌شوم که کمربند ایمنی به درستی استفاده شود"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1408",
      "question_text": "Sie bringen ein Kind mit dem Auto zum Kindergarten oder zur Schule. Was beachten Sie dabei?",
      "answers": [
          "Ich benutze den Parkplatz der Schule bzw. des Kindergartens, wenn das möglich ist",
          "Ich halte so an, dass das Kind nach dem Aussteigen die Fahrbahn nicht mehr überqueren muss",
          "Um Kinder ein- oder aussteigen zu lassen, darf auch in zweiter Spur kurz gehalten werden",
          "Ich lasse das Kind auf der dem Gehsteig zugewandten Seite aussteigen"
      ],
      "correct_answers": [
          "Ich benutze den Parkplatz der Schule bzw. des Kindergartens, wenn das möglich ist",
          "Ich halte so an, dass das Kind nach dem Aussteigen die Fahrbahn nicht mehr überqueren muss",
          "Ich lasse das Kind auf der dem Gehsteig zugewandten Seite aussteigen"
      ],
      "question_text_fa": "شما یک کودک را با ماشین به مهدکودک یا مدرسه می‌برید. به چه نکاتی باید توجه کنید؟",
      "answers_fa": [
          "اگر ممکن است از پارکینگ مدرسه یا مهدکودک استفاده می‌کنم",
          "به گونه‌ای توقف می‌کنم که کودک پس از پیاده شدن نیازی به عبور از خیابان نداشته باشد",
          "برای سوار یا پیاده کردن کودکان می‌توان به طور موقت در خط دوم توقف کرد",
          "کودک را از سمت پیاده‌رو پیاده می‌کنم"
      ],
      "correct_answers_fa": [
          "اگر ممکن است از پارکینگ مدرسه یا مهدکودک استفاده می‌کنم",
          "به گونه‌ای توقف می‌کنم که کودک پس از پیاده شدن نیازی به عبور از خیابان نداشته باشد",
          "کودک را از سمت پیاده‌رو پیاده می‌کنم"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1409",
      "question_text": "Sie wollen mit Ihrem PKW ein Kleinkind im Kindersitz befördern. Was sollten Sie bei der Kleidung des Kindes beachten?",
      "answers": [
          "Das Kind sollte keine dicke Kleidung zwischen seinem Körper und den Gurten tragen",
          "Das Kind sollte möglichst dicke Kleidung tragen",
          "Das Kind sollte einen Kinderhelm tragen",
          "Das Kind sollte möglichst keine Schuhe tragen"
      ],
      "correct_answers": [
          "Das Kind sollte keine dicke Kleidung zwischen seinem Körper und den Gurten tragen"
      ],
      "question_text_fa": "شما می‌خواهید یک کودک خردسال را در صندلی کودک در خودرو حمل کنید. در مورد لباس کودک به چه نکاتی باید توجه کنید؟",
      "answers_fa": [
          "کودک نباید لباس ضخیمی بین بدن و کمربندها داشته باشد",
          "کودک باید لباس ضخیمی بپوشد",
          "کودک باید یک کلاه ایمنی کودک داشته باشد",
          "کودک نباید کفش بپوشد"
      ],
      "correct_answers_fa": [
          "کودک نباید لباس ضخیمی بین بدن و کمربندها داشته باشد"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1620",
      "question_text": "Sie wollen diese Fahrzeugkombination mit der Lenkberechtigung der Klasse B lenken. Dürfen Sie das? Warum?",
      "answers": [
          "Ja, weil das Zugfahrzeug nicht mehr als 3.500 kg höchstes zulässiges Gesamtgewicht hat und ein leichter Anhänger (Fahrzeugart \"O1\") gezogen wird",
          "Nein, weil die Summe der höchsten zulässigen Gesamtgewichte 3.500 kg übersteigt",
          "Nein, weil mit der Klasse B keine Anhänger gezogen werden dürfen",
          "Ja, aber nur dann, wenn der Anhänger unbeladen ist"
      ],
      "correct_answers": [
          "Ja, weil das Zugfahrzeug nicht mehr als 3.500 kg höchstes zulässiges Gesamtgewicht hat und ein leichter Anhänger (Fahrzeugart \"O1\") gezogen wird"
      ],
      "question_text_fa": "شما می‌خواهید این ترکیب خودرو را با گواهینامه کلاس B برانید. آیا مجاز هستید؟ چرا؟",
      "answers_fa": [
          "بله، زیرا خودروی کشنده بیش از 3,500 کیلوگرم وزن مجاز کل ندارد و یک تریلر سبک (نوع وسیله نقلیه 'O1') کشیده می‌شود",
          "خیر، زیرا مجموع وزن‌های مجاز کل از 3,500 کیلوگرم بیشتر است",
          "خیر، زیرا با کلاس B اجازه کشیدن تریلر ندارید",
          "بله، اما فقط در صورتی که تریلر خالی باشد"
      ],
      "correct_answers_fa": [
          "بله، زیرا خودروی کشنده بیش از 3,500 کیلوگرم وزن مجاز کل ندارد و یک تریلر سبک (نوع وسیله نقلیه 'O1') کشیده می‌شود"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1621",
      "question_text": "Sie wollen mit der Lenkberechtigung der Klasse B einen leichten, ungebremsten Anhänger (Fahrzeugart 'O1') ziehen. Was müssen Sie dabei beachten?",
      "answers": [
          "Das Eigengewicht des PKW plus 75 kg muss mehr als doppelt so groß sein wie das Gesamtgewicht des Anhängers",
          "Die Summe der höchsten zulässigen Gesamtgewichte von Zugfahrzeug und Anhänger darf 1.500 kg nicht übersteigen",
          "Das Eigengewicht des PKW muss mindestens 750 kg betragen",
          "Die Nutzlast des PKW muss mindestens 200 kg betragen"
      ],
      "correct_answers": [
          "Das Eigengewicht des PKW plus 75 kg muss mehr als doppelt so groß sein wie das Gesamtgewicht des Anhängers"
      ],
      "question_text_fa": "شما می‌خواهید با گواهینامه رانندگی کلاس B یک تریلر سبک و بدون ترمز (نوع وسیله نقلیه 'O1') بکسل کنید. چه نکاتی را باید رعایت کنید؟",
      "answers_fa": [
          "وزن خالص خودروی سواری به علاوه ۷۵ کیلوگرم باید بیش از دو برابر وزن کلی تریلر باشد",
          "جمع بالاترین وزن‌های مجاز وسیله نقلیه بکسل کننده و تریلر نباید از ۱۵۰۰ کیلوگرم تجاوز کند",
          "وزن خالص خودروی سواری باید حداقل ۷۵۰ کیلوگرم باشد",
          "بار مجاز خودروی سواری باید حداقل ۲۰۰ کیلوگرم باشد"
      ],
      "correct_answers_fa": [
          "وزن خالص خودروی سواری به علاوه ۷۵ کیلوگرم باید بیش از دو برابر وزن کلی تریلر باشد"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  }
  ,
  {
      "question_number": "1622",
      "question_text": "Beachten Sie die Angaben in der Zulassungsbescheinigung der Kombilimousine. Dürfen Sie dieses Fahrzeug mit der Lenkberechtigung der Klasse B lenken?",
      "answers": [
          "Ja, weil das höchste zulässige Gesamtgewicht der Kombilimousine nicht mehr als 3.500 kg beträgt",
          "Ja, aber nur, wenn keine Ladung befördert wird",
          "Nein",
          "Ja, aber nur, wenn keine Personen befördert werden"
      ],
      "correct_answers": [
          "Ja, weil das höchste zulässige Gesamtgewicht der Kombilimousine nicht mehr als 3.500 kg beträgt"
      ],
      "question_text_fa": "به مشخصات موجود در گواهی ثبت خودروی استیشن توجه کنید. آیا می‌توانید این خودرو را با گواهینامه کلاس B برانید؟",
      "answers_fa": [
          "بله، زیرا وزن مجاز کل خودروی استیشن بیش از 3,500 کیلوگرم نیست",
          "بله، اما فقط در صورتی که باری حمل نشود",
          "خیر",
          "بله، اما فقط در صورتی که مسافری حمل نشود"
      ],
      "correct_answers_fa": [
          "بله، زیرا وزن مجاز کل خودروی استیشن بیش از 3,500 کیلوگرم نیست"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1623",
      "question_text": "Sie wollen diese Fahrzeugkombination mit der Lenkberechtigung der Klasse B lenken. Dürfen Sie das?",
      "answers": [
          "Nein, weil der Anhänger zu den schweren Anhängern (Fahrzeugart \"O2\") gehört und die Summe der höchsten zulässigen Gesamtgewichte über 3.500 kg beträgt",
          "Ja, solang der Anhänger unbeladen ist",
          "Ja, solang ich das Ortsgebiet nicht verlasse",
          "Ja, solang ich keine Autobahnen befahre"
      ],
      "correct_answers": [
          "Nein, weil der Anhänger zu den schweren Anhängern (Fahrzeugart \"O2\") gehört und die Summe der höchsten zulässigen Gesamtgewichte über 3.500 kg beträgt"
      ],
      "question_text_fa": "شما می‌خواهید این ترکیب خودرو را با گواهینامه کلاس B برانید. آیا مجاز هستید؟",
      "answers_fa": [
          "خیر، زیرا تریلر از نوع تریلرهای سنگین (نوع وسیله نقلیه 'O2') است و مجموع وزن‌های مجاز کل بیش از 3,500 کیلوگرم است",
          "بله، تا زمانی که تریلر خالی باشد",
          "بله، تا زمانی که از منطقه شهری خارج نشوم",
          "بله، تا زمانی که از بزرگراه‌ها استفاده نکنم"
      ],
      "correct_answers_fa": [
          "خیر، زیرا تریلر از نوع تریلرهای سنگین (نوع وسیله نقلیه 'O2') است و مجموع وزن‌های مجاز کل بیش از 3,500 کیلوگرم است"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  
  
  {
      "question_number": "1626",
      "question_text": "Sie wollen diese Fahrzeugkombination mit der Lenkberechtigung der Klasse B lenken. Dürfen Sie das, wenn der Anhänger mit 850 kg beladen ist?",
      "answers": [
          "Ja, auf jeden Fall",
          "Nein",
          "Ja, solang ich das Ortsgebiet nicht verlasse",
          "Ja, solang ich keine Autobahnen befahre"
      ],
      "correct_answers": [
          "Ja, auf jeden Fall"
      ],
      "question_text_fa": "شما می‌خواهید این ترکیب خودرو را با گواهینامه کلاس B برانید. آیا مجاز هستید، اگر تریلر 850 کیلوگرم بار داشته باشد؟",
      "answers_fa": [
          "بله، حتماً",
          "خیر",
          "بله، تا زمانی که از منطقه شهری خارج نشوم",
          "بله، تا زمانی که از بزرگراه‌ها استفاده نکنم"
      ],
      "correct_answers_fa": [
          "بله، حتماً"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1627",
      "question_text": "Sie wollen diese Fahrzeugkombination mit der Lenkberechtigung der Klasse B lenken. Warum dürfen Sie das, wenn der Anhänger mit 850 kg beladen ist?",
      "answers": [
          "Weil zwar ein schwerer Anhänger (Fahrzeugart 'O2') gezogen wird, aber die Summe der höchsten zulässigen Gesamtgewichte 3.500 kg nicht übersteigt",
          "Weil der Anhänger in diesem Fall nur 1.300 kg wiegt, wird die höchste zulässige Anhängelast am Zugfahrzeug nicht überschritten",
          "Weil das Eigengewicht des Kombis und das Eigengewicht des Anhängers jeweils 3.500 kg nicht übersteigen",
          "Weil das höchste zulässige Gesamtgewicht des Anhängers das höchste zulässige Gesamtgewicht des Zugfahrzeuges nicht übersteigt"
      ],
      "correct_answers": [
          "Weil zwar ein schwerer Anhänger (Fahrzeugart 'O2') gezogen wird, aber die Summe der höchsten zulässigen Gesamtgewichte 3.500 kg nicht übersteigt",
          "Weil der Anhänger in diesem Fall nur 1.300 kg wiegt, wird die höchste zulässige Anhängelast am Zugfahrzeug nicht überschritten"
      ],
      "question_text_fa": "شما می‌خواهید این ترکیب وسیله نقلیه را با گواهینامه رانندگی کلاس B هدایت کنید. چرا می‌توانید این کار را انجام دهید اگر تریلر با ۸۵۰ کیلوگرم بارگیری شده باشد؟",
      "answers_fa": [
          "زیرا تریلر سنگینی (نوع وسیله نقلیه 'O2') کشیده می‌شود، اما مجموع حداکثر وزن‌های مجاز از ۳۵۰۰ کیلوگرم تجاوز نمی‌کند",
          "زیرا در این حالت تریلر تنها ۱۳۰۰ کیلوگرم وزن دارد و حداکثر ظرفیت مجاز تریلر در خودروی بکسل کننده تجاوز نمی‌شود",
          "زیرا وزن خالص خودروی سواری و تریلر هر یک از ۳۵۰۰ کیلوگرم تجاوز نمی‌کند",
          "زیرا حداکثر وزن مجاز تریلر از حداکثر وزن مجاز خودروی بکسل کننده تجاوز نمی‌کند"
      ],
      "correct_answers_fa": [
          "زیرا تریلر سنگینی (نوع وسیله نقلیه 'O2') کشیده می‌شود، اما مجموع حداکثر وزن‌های مجاز از ۳۵۰۰ کیلوگرم تجاوز نمی‌کند",
          "زیرا در این حالت تریلر تنها ۱۳۰۰ کیلوگرم وزن دارد و حداکثر ظرفیت مجاز تریلر در خودروی بکسل کننده تجاوز نمی‌شود"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  }
  ,
  {
      "question_number": "1641",
      "question_text": "Sie wollen auf dem Dachträger Ihres PKW eine Holzplatte befördern. Was müssen Sie beim Beladen berücksichtigen?",
      "answers": [
          "Dass die Holzplatte gegen Verrutschen und Abheben ausreichend gesichert ist",
          "Dass die höchste zulässige Dachlast gemäß Betriebsanleitung nicht überschritten wird",
          "Dass die Holzplatte nicht nach hinten hinausragt",
          "Dass die Holzplatte einen auffälligen Farbanstrich hat"
      ],
      "correct_answers": [
          "Dass die Holzplatte gegen Verrutschen und Abheben ausreichend gesichert ist",
          "Dass die höchste zulässige Dachlast gemäß Betriebsanleitung nicht überschritten wird"
      ],
      "question_text_fa": "شما می‌خواهید یک صفحه چوبی را روی باربند خودروی خود حمل کنید. هنگام بارگیری باید به چه نکاتی توجه کنید؟",
      "answers_fa": [
          "اینکه صفحه چوبی به طور کافی در برابر لغزش و بلند شدن از جا ایمن شده باشد",
          "اینکه حداکثر بار مجاز برای باربند مطابق با دفترچه راهنما رعایت شده باشد",
          "اینکه صفحه چوبی از عقب خودرو بیرون نزند",
          "اینکه صفحه چوبی دارای رنگ‌آمیزی برجسته‌ای باشد"
      ],
      "correct_answers_fa": [
          "اینکه صفحه چوبی به طور کافی در برابر لغزش و بلند شدن از جا ایمن شده باشد",
          "اینکه حداکثر بار مجاز برای باربند مطابق با دفترچه راهنما رعایت شده باشد"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1647",
      "question_text": "Auf welchen Sitzen eines PKW muss man sich angurten?",
      "answers": [
          "Auf allen Sitzen, die mit Sicherheitsgurten ausgerüstet sind",
          "Nur auf den Vordersitzen, wenn diese mit Sicherheitsgurten ausgerüstet sind",
          "Nur auf Sitzen, auf denen Kinder befördert werden",
          "Nur auf Sitzen, für die kein Airbag vorhanden ist"
      ],
      "correct_answers": [
          "Auf allen Sitzen, die mit Sicherheitsgurten ausgerüstet sind"
      ],
      "question_text_fa": "در کدام صندلی‌های یک خودروی سواری باید از کمربند ایمنی استفاده کرد؟",
      "answers_fa": [
          "در تمامی صندلی‌هایی که به کمربند ایمنی مجهز هستند",
          "فقط در صندلی‌های جلو، اگر به کمربند ایمنی مجهز باشند",
          "فقط در صندلی‌هایی که کودکان حمل می‌شوند",
          "فقط در صندلی‌هایی که کیسه هوا وجود ندارد"
      ],
      "correct_answers_fa": [
          "در تمامی صندلی‌هایی که به کمربند ایمنی مجهز هستند"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1648",
      "question_text": "Sie lenken einen PKW. Sind Sie dafür verantwortlich, dass Mitfahrende Gurte bzw. Kinderrückhalteeinrichtungen benützen?",
      "answers": [
          "Ja, bei Kindern, die jünger als 14 Jahre alt sind",
          "Ja, bei allen Personen, die kleiner als 135 cm sind",
          "Nein, nie",
          "Ja, immer"
      ],
      "correct_answers": [
          "Ja, bei Kindern, die jünger als 14 Jahre alt sind"
      ],
      "question_text_fa": "شما یک خودروی سواری می‌رانید. آیا مسئولیت استفاده از کمربند ایمنی یا سیستم‌های نگهدارنده کودکان بر عهده شما است؟",
      "answers_fa": [
          "بله، در مورد کودکان زیر 14 سال",
          "بله، در مورد تمامی افراد زیر 135 سانتی‌متر",
          "خیر، هیچ‌گاه",
          "بله، همیشه"
      ],
      "correct_answers_fa": [
          "بله، در مورد کودکان زیر 14 سال"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1649",
      "question_text": "Bis zu welchem Alter der Mitfahrer sind Sie als Lenker für deren korrekte Sicherung durch den Sicherheitsgurt oder geeignete Kinderrückhaltesysteme verantwortlich?",
      "answers": [
          "8 Jahre",
          "14 Jahre",
          "10 Jahre",
          "12 Jahre"
      ],
      "correct_answers": [
          "14 Jahre"
      ],
      "question_text_fa": "تا چه سنی از سرنشینان مسئولیت دارید که آنها را به درستی با کمربند ایمنی یا سیستم‌های مناسب نگهدارنده کودکان ایمن کنید؟",
      "answers_fa": [
          "8 سال",
          "14 سال",
          "10 سال",
          "12 سال"
      ],
      "correct_answers_fa": [
          "14 سال"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1650",
      "question_text": "Unter welchen Voraussetzungen darf eine Person, die unter 14 Jahre alt ist, in der ersten Sitzreihe eines PKW befördert werden?",
      "answers": [
          "Wenn sie 135 cm oder größer ist und den Sicherheitsgurt verwendet",
          "Wenn sie kleiner als 135 cm ist, müssen geeignete Kinderrückhaltesysteme verwendet werden",
          "Wenn für den Sitz ein Airbag vorhanden ist",
          "Wenn es keine zweite Sitzreihe gibt"
      ],
      "correct_answers": [
          "Wenn sie 135 cm oder größer ist und den Sicherheitsgurt verwendet",
          "Wenn sie kleiner als 135 cm ist, müssen geeignete Kinderrückhaltesysteme verwendet werden"
      ],
      "question_text_fa": "تحت چه شرایطی مجاز هستید یک فرد زیر 14 سال را در ردیف جلوی یک خودروی سواری حمل کنید؟",
      "answers_fa": [
          "اگر قد او 135 سانتی‌متر یا بیشتر باشد و از کمربند ایمنی استفاده کند",
          "اگر قد او کمتر از 135 سانتی‌متر باشد، باید از سیستم‌های مناسب نگهدارنده کودکان استفاده شود",
          "اگر برای صندلی کیسه هوا موجود باشد",
          "اگر ردیف دوم صندلی وجود نداشته باشد"
      ],
      "correct_answers_fa": [
          "اگر قد او 135 سانتی‌متر یا بیشتر باشد و از کمربند ایمنی استفاده کند",
          "اگر قد او کمتر از 135 سانتی‌متر باشد، باید از سیستم‌های مناسب نگهدارنده کودکان استفاده شود"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1651",
      "question_text": "Warum dürfen Sie ein Kind, das kleiner als 135 cm ist, in Kraftwagen nur mit einem angepassten Kinderrückhaltesystem befördern?",
      "answers": [
          "Weil das Kind bei einem Unfall am Hals lebensgefährlich verletzt werden könnte, wenn der Erwachsenengurt verwendet wird",
          "Weil das Kind in einem Erwachsenengurt zu stark eingeschränkt wäre",
          "Weil das Kind an den Füßen lebensgefährlich verletzt werden könnte",
          "Weil das Kind bei einem Unfall lebensgefährliche Bauchverletzungen erleiden könnte, wenn nur der Erwachsenengurt verwendet wird"
      ],
      "correct_answers": [
          "Weil das Kind bei einem Unfall am Hals lebensgefährlich verletzt werden könnte, wenn der Erwachsenengurt verwendet wird",
          "Weil das Kind bei einem Unfall lebensgefährliche Bauchverletzungen erleiden könnte, wenn nur der Erwachsenengurt verwendet wird"
      ],
      "question_text_fa": "چرا مجاز نیستید یک کودک با قد کمتر از 135 سانتی‌متر را بدون استفاده از سیستم نگهدارنده مناسب کودکان در خودرو حمل کنید؟",
      "answers_fa": [
          "زیرا اگر در تصادف از کمربند بزرگسالان استفاده شود، ممکن است کودک از ناحیه گردن به شدت آسیب ببیند",
          "زیرا کودک در کمربند بزرگسالان بسیار محدود می‌شود",
          "زیرا کودک ممکن است از ناحیه پا به شدت آسیب ببیند",
          "زیرا اگر در تصادف از کمربند بزرگسالان استفاده شود، ممکن است کودک به شدت از ناحیه شکم آسیب ببیند"
      ],
      "correct_answers_fa": [
          "زیرا اگر در تصادف از کمربند بزرگسالان استفاده شود، ممکن است کودک از ناحیه گردن به شدت آسیب ببیند",
          "زیرا اگر در تصادف از کمربند بزرگسالان استفاده شود، ممکن است کودک به شدت از ناحیه شکم آسیب ببیند"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1659",
      "question_text": "Beachten Sie die Angaben im Führerschein. Dürfen Sie mit dieser Lenkberechtigung der Klasse B einen leichten Anhänger (Fahrzeugart \"O1\") ziehen?",
      "answers": [
          "Ja, auf jeden Fall",
          "Ja, aber nur, wenn die Summe der höchsten zulässigen Gesamtgewichte nicht mehr als 3.500 kg beträgt",
          "Nein",
          "Ja, aber nur Anhänger wenn der Anhänger keine Bremse hat"
      ],
      "correct_answers": [
          "Ja, auf jeden Fall"
      ],
      "question_text_fa": "به اطلاعات درج شده در گواهینامه توجه کنید. آیا با این گواهینامه کلاس B مجاز هستید یک تریلر سبک (نوع وسیله نقلیه \"O1\") را بکشید؟",
      "answers_fa": [
          "بله، حتماً",
          "بله، اما فقط در صورتی که مجموع حداکثر وزن‌های مجاز بیشتر از 3,500 کیلوگرم نباشد",
          "خیر",
          "بله، اما فقط در صورتی که تریلر ترمز نداشته باشد"
      ],
      "correct_answers_fa": [
          "بله، حتماً"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1660",
      "question_text": "Beachten Sie die Angaben im Führerschein. Dürfen Sie mit dieser Lenkberechtigung der Klasse B einen schweren Anhänger (Fahrzeugart \"O2\") ziehen?",
      "answers": [
          "Ja, aber nur, wenn die Summe der höchsten zulässigen Gesamtgewichte nicht mehr als 3.500 kg beträgt",
          "Ja, auf jeden Fall",
          "Nein",
          "Ja, aber nur, wenn der Anhänger keine Bremse hat"
      ],
      "correct_answers": [
          "Ja, aber nur, wenn die Summe der höchsten zulässigen Gesamtgewichte nicht mehr als 3.500 kg beträgt"
      ],
      "question_text_fa": "به اطلاعات درج شده در گواهینامه توجه کنید. آیا با این گواهینامه کلاس B مجاز هستید یک تریلر سنگین (نوع وسیله نقلیه \"O2\") را بکشید؟",
      "answers_fa": [
          "بله، اما فقط در صورتی که مجموع حداکثر وزن‌های مجاز بیشتر از 3,500 کیلوگرم نباشد",
          "بله، حتماً",
          "خیر",
          "بله، اما فقط در صورتی که تریلر ترمز نداشته باشد"
      ],
      "correct_answers_fa": [
          "بله، اما فقط در صورتی که مجموع حداکثر وزن‌های مجاز بیشتر از 3,500 کیلوگرم نباشد"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1661",
      "question_text": "Beachten Sie die Angaben in der Zulassungsbescheinigung. Müssen Sie mit diesem Anhänger einen Unterlegkeil mitführen?",
      "answers": [
          "Nein, weil es sich um einen leichten Anhänger (Fahrzeugart 'O1') handelt",
          "Ja, weil es sich um einen leichten Anhänger (Fahrzeugart 'O1') handelt",
          "Ja, weil mit allen Anhängern ein Unterlegkeil mitgeführt werden muss",
          "Nein, weil mit Anhängern niemals ein Unterlegkeil mitgeführt werden muss"
      ],
      "correct_answers": [
          "Nein, weil es sich um einen leichten Anhänger (Fahrzeugart 'O1') handelt"
      ],
      "question_text_fa": "به اطلاعات موجود در سند ثبت‌نام توجه کنید. آیا باید با این تریلر یک چرخ‌گیر حمل کنید؟",
      "answers_fa": [
          "خیر، زیرا این یک تریلر سبک (نوع وسیله نقلیه 'O1') است",
          "بله، زیرا این یک تریلر سبک (نوع وسیله نقلیه 'O1') است",
          "بله، زیرا با همه تریلرها باید یک چرخ‌گیر حمل شود",
          "خیر، زیرا با تریلرها هرگز نیازی به حمل چرخ‌گیر نیست"
      ],
      "correct_answers_fa": [
          "خیر، زیرا این یک تریلر سبک (نوع وسیله نقلیه 'O1') است"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  }
  ,
  {
      "question_number": "1662",
      "question_text": "Woran können Sie erkennen, ob dieser Anhänger ungebremst ist?",
      "answers": [
          "Daran, dass keine Handbremse vorhanden ist",
          "Daran, dass ein Unterlegkeil vorhanden ist",
          "Daran, dass ein Stützrad vorhanden ist",
          "Daran, dass der Anhänger eine Abreißsicherung aufweist"
      ],
      "correct_answers": [
          "Daran, dass keine Handbremse vorhanden ist"
      ],
      "question_text_fa": "چگونه می‌توانید تشخیص دهید که این تریلر بدون ترمز است؟",
      "answers_fa": [
          "از این که ترمز دستی وجود ندارد",
          "از این که یک چرخ‌گیر وجود دارد",
          "از این که یک چرخ حمایتی وجود دارد",
          "از این که تریلر دارای یک ایمنی شکستنی است"
      ],
      "correct_answers_fa": [
          "از این که ترمز دستی وجود ندارد"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  }
  ,
  {
      "question_number": "1663",
      "question_text": "Beachten Sie die Angaben in der Zulassungsbescheinigung. Woran können Sie erkennen, dass es sich um einen schweren Anhänger handelt?",
      "answers": [
          "An der Eintragung \"O2\" in der Zeile \"J\"",
          "Daran, dass das höchste zulässige Gesamtgewicht mehr als 750 kg beträgt",
          "An der Art des Aufbaus",
          "An der Höhe der höchsten zulässigen Stützlast"
      ],
      "correct_answers": [
          "An der Eintragung \"O2\" in der Zeile \"J\"",
          "Daran, dass das höchste zulässige Gesamtgewicht mehr als 750 kg beträgt"
      ],
      "question_text_fa": "به اطلاعات موجود در گواهینامه ثبت توجه کنید. چگونه می‌توانید تشخیص دهید که این یک تریلر سنگین است؟",
      "answers_fa": [
          "از ثبت \"O2\" در خط \"J\"",
          "از اینکه بیشینه وزن مجاز بیشتر از ۷۵۰ کیلوگرم است",
          "از نوع ساختار",
          "از ارتفاع بیشینه بار مجاز"
      ],
      "correct_answers_fa": [
          "از ثبت \"O2\" در خط \"J\"",
          "از اینکه بیشینه وزن مجاز بیشتر از ۷۵۰ کیلوگرم است"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  }
  ,
  {
      "question_number": "1664",
      "question_text": "Beachten Sie die Angaben in der Zulassungsbescheinigung. Welche Ausrüstungsgegenstände müssen Sie bei diesem Anhänger mitführen?",
      "answers": [
          "Einen Unterlegkeil",
          "Auf jeden Fall zwei Unterlegkeile",
          "Auf jeden Fall eine Abdeckplane",
          "Auf jeden Fall ein Reserverad"
      ],
      "correct_answers": [
          "Einen Unterlegkeil"
      ],
      "question_text_fa": "به اطلاعات موجود در گواهینامه ثبت توجه کنید. چه تجهیزات ضروری باید همراه این تریلر باشد؟",
      "answers_fa": [
          "یک چوب‌زیر بغل",
          "حتماً دو چوب‌زیر بغل",
          "حتماً یک روکش",
          "حتماً یک لاستیک یدکی"
      ],
      "correct_answers_fa": [
          "یک چوب‌زیر بغل"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  }
  ,
  
  
  {
      "question_number": "1669",
      "question_text": "Wie schnell dürfen Sie mit dieser Fahrzeugkombination höchstens fahren (Ortsgebiet - Freiland - Autostraße - Autobahn)?",
      "answers": [
          "50 km/h - 80 km/h - 100 km/h - 100 km/h",
          "50 km/h - 100 km/h - 100 km/h - 130 km/h",
          "50 km/h - 70 km/h - 80 km/h - 100 km/h",
          "50 km/h - 100 km/h - 100 km/h - 100 km/h"
      ],
      "correct_answers": [
          "50 km/h - 100 km/h - 100 km/h - 100 km/h"
      ],
      "question_text_fa": "با این ترکیب خودرو حداکثر با چه سرعتی می‌توانید رانندگی کنید؟ (محدوده شهری - خارج از شهر - جاده‌ها - بزرگراه‌ها)",
      "answers_fa": [
          "50 کیلومتر/ساعت - 80 کیلومتر/ساعت - 100 کیلومتر/ساعت - 100 کیلومتر/ساعت",
          "50 کیلومتر/ساعت - 100 کیلومتر/ساعت - 100 کیلومتر/ساعت - 130 کیلومتر/ساعت",
          "50 کیلومتر/ساعت - 70 کیلومتر/ساعت - 80 کیلومتر/ساعت - 100 کیلومتر/ساعت",
          "50 کیلومتر/ساعت - 100 کیلومتر/ساعت - 100 کیلومتر/ساعت - 100 کیلومتر/ساعت"
      ],
      "correct_answers_fa": [
          "50 کیلومتر/ساعت - 100 کیلومتر/ساعت - 100 کیلومتر/ساعت - 100 کیلومتر/ساعت"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1670",
      "question_text": "Dürfen Sie diese Fahrzeugkombination auf einer Fahrbahn zum Halten oder Parken abstellen?",
      "answers": [
          "Ja",
          "Nein",
          "Nur dann, wenn eine Ladetätigkeit durchgeführt wird",
          "Nur dann, wenn der Anhänger ohne Zugfahrzeug abgestellt wird"
      ],
      "correct_answers": [
          "Ja"
      ],
      "question_text_fa": "آیا می‌توانید این ترکیب وسیله نقلیه را در یک جاده برای توقف یا پارک کردن قرار دهید؟",
      "answers_fa": [
          "بله",
          "خیر",
          "فقط در صورتی که فعالیت بارگیری انجام شود",
          "فقط در صورتی که تریلر بدون وسیله نقلیه کشنده پارک شود"
      ],
      "correct_answers_fa": [
          "بله"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1671",
      "question_text": "Wie schnell dürfen Sie mit dieser Fahrzeugkombination höchstens fahren (Ortsgebiet - Freiland - Autostraße - Autobahn)?",
      "answers": [
          "50 km/h - 80 km/h - 100 km/h - 100 km/h",
          "50 km/h - 60 km/h - 70 km/h - 100 km/h",
          "50 km/h - 80 km/h - 80 km/h - 130 km/h",
          "50 km/h - 80 km/h - 80 km/h - 100 km/h"
      ],
      "correct_answers": [
          "50 km/h - 80 km/h - 100 km/h - 100 km/h"
      ],
      "question_text_fa": "حداکثر با چه سرعتی می‌توانید این ترکیب وسیله نقلیه را برانید؟ (محدوده شهری - خارج از شهر - جاده‌ها - بزرگراه‌ها)",
      "answers_fa": [
          "50 کیلومتر/ساعت - 80 کیلومتر/ساعت - 100 کیلومتر/ساعت - 100 کیلومتر/ساعت",
          "50 کیلومتر/ساعت - 60 کیلومتر/ساعت - 70 کیلومتر/ساعت - 100 کیلومتر/ساعت",
          "50 کیلومتر/ساعت - 80 کیلومتر/ساعت - 80 کیلومتر/ساعت - 130 کیلومتر/ساعت",
          "50 کیلومتر/ساعت - 80 کیلومتر/ساعت - 80 کیلومتر/ساعت - 100 کیلومتر/ساعت"
      ],
      "correct_answers_fa": [
          "50 کیلومتر/ساعت - 80 کیلومتر/ساعت - 100 کیلومتر/ساعت - 100 کیلومتر/ساعت"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1672",
      "question_text": "Worauf müssen Sie bezüglich der Stützlast achten, wenn Sie diese Fahrzeugkombination lenken?",
      "answers": [
          "Ich muss den Anhänger so beladen, dass dessen Deichsellast nicht mehr als 75 kg (die höchste zulässige Stützlast dieses Zugfahrzeugs) beträgt",
          "Ich muss den Anhänger so beladen, dass dessen Deichsellast nicht weniger als 75 kg (die höchste zulässige Stützlast dieses Zugfahrzeugs) beträgt",
          "Ich muss den PKW so beladen, dass die Stützlast nicht mehr als 75 kg beträgt",
          "Ich muss den PKW so beladen, dass die Stützlast nicht weniger als 75 kg beträgt"
      ],
      "correct_answers": [
          "Ich muss den Anhänger so beladen, dass dessen Deichsellast nicht mehr als 75 kg (die höchste zulässige Stützlast dieses Zugfahrzeugs) beträgt"
      ],
      "question_text_fa": "هنگام هدایت این ترکیب وسیله نقلیه، باید به چه مواردی در مورد بار پشتیبان توجه کنید؟",
      "answers_fa": [
          "باید تریلر را طوری بارگیری کنم که بار اتصال کشنده آن بیشتر از 75 کیلوگرم (حداکثر بار پشتیبان مجاز این وسیله نقلیه کشنده) نباشد",
          "باید تریلر را طوری بارگیری کنم که بار اتصال کشنده آن کمتر از 75 کیلوگرم (حداکثر بار پشتیبان مجاز این وسیله نقلیه کشنده) نباشد",
          "باید خودرو را طوری بارگیری کنم که بار پشتیبان بیشتر از 75 کیلوگرم نباشد",
          "باید خودرو را طوری بارگیری کنم که بار پشتیبان کمتر از 75 کیلوگرم نباشد"
      ],
      "correct_answers_fa": [
          "باید تریلر را طوری بارگیری کنم که بار اتصال کشنده آن بیشتر از 75 کیلوگرم (حداکثر بار پشتیبان مجاز این وسیله نقلیه کشنده) نباشد"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1673",
      "question_text": "Wie viele Personen dürfen Sie beim Lenken dieses PKW höchstens mitnehmen?",
      "answers": [
          "Vier",
          "Drei",
          "Zwei",
          "Eine"
      ],
      "correct_answers": [
          "Vier"
      ],
      "question_text_fa": "هنگام هدایت این خودرو حداکثر چند نفر را می‌توانید حمل کنید؟",
      "answers_fa": [
          "چهار",
          "سه",
          "دو",
          "یک"
      ],
      "correct_answers_fa": [
          "چهار"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1674",
      "question_text": "Sie wollen in diesem PKW vier volljährige Personen befördern. Wer ist dafür verantwortlich, dass diese Personen die Sicherheitsgurte verwenden?",
      "answers": [
          "Jede Person für sich selbst",
          "Die Lenkerin bzw. der Lenker",
          "Nur für die Personen auf den hinteren Plätzen die Lenkerin bzw. der Lenker",
          "Nur bei Personen auf dem Beifahrersitz die Lenkerin bzw. der Lenker"
      ],
      "correct_answers": [
          "Jede Person für sich selbst"
      ],
      "question_text_fa": "شما می‌خواهید در این خودرو چهار فرد بالغ را جابه‌جا کنید. چه کسی مسئول استفاده از کمربند ایمنی توسط این افراد است؟",
      "answers_fa": [
          "هر شخص مسئول خودش است",
          "راننده",
          "فقط برای افرادی که در صندلی‌های عقب هستند راننده مسئول است",
          "فقط برای فردی که در صندلی کنار راننده است، راننده مسئول است"
      ],
      "correct_answers_fa": [
          "هر شخص مسئول خودش است"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1675",
      "question_text": "Sie wollen diese Fahrzeugkombination mit der Lenkberechtigung der Klasse B lenken. Dürfen Sie das?",
      "answers": [
          "Ja",
          "Ja, aber nur, wenn der Anhänger unbeladen ist",
          "Ja, aber nur, wenn das Gesamtgewicht des Anhängers nicht mehr als 1.340 kg beträgt",
          "Nein"
      ],
      "correct_answers": [
          "Nein"
      ],
      "question_text_fa": "شما می‌خواهید این ترکیب وسیله نقلیه را با گواهینامه کلاس B هدایت کنید. آیا مجاز به این کار هستید؟",
      "answers_fa": [
          "بله",
          "بله، اما فقط در صورتی که تریلر خالی باشد",
          "بله، اما فقط در صورتی که وزن کل تریلر بیشتر از 1,340 کیلوگرم نباشد",
          "خیر"
      ],
      "correct_answers_fa": [
          "خیر"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1676",
      "question_text": "Warum dürfen Sie diese Fahrzeugkombination mit der Lenkberechtigung der Klasse B nicht lenken?",
      "answers": [
          "Weil ein schwerer Anhänger (Fahrzeugart \"O2\") gezogen wird und die Summe der höchsten zulässigen Gesamtgewichte der beiden Fahrzeuge mehr als 3.500 kg beträgt",
          "Weil die höchste zulässige Anhängelast zu gering ist",
          "Weil die höchsten zulässigen Achslasten zu gering sind",
          "Weil die höchste zulässige Nutzlast zu gering ist"
      ],
      "correct_answers": [
          "Weil ein schwerer Anhänger (Fahrzeugart \"O2\") gezogen wird und die Summe der höchsten zulässigen Gesamtgewichte der beiden Fahrzeuge mehr als 3.500 kg beträgt"
      ],
      "question_text_fa": "چرا مجاز نیستید این ترکیب وسیله نقلیه را با گواهینامه کلاس B هدایت کنید؟",
      "answers_fa": [
          "زیرا یک تریلر سنگین (نوع وسیله نقلیه \"O2\") کشیده می‌شود و مجموع حداکثر وزن‌های مجاز دو وسیله نقلیه بیشتر از 3,500 کیلوگرم است",
          "زیرا حداکثر بار مجاز تریلر خیلی کم است",
          "زیرا حداکثر بار محورهای مجاز خیلی کم است",
          "زیرا حداکثر ظرفیت بار مجاز خیلی کم است"
      ],
      "correct_answers_fa": [
          "زیرا یک تریلر سنگین (نوع وسیله نقلیه \"O2\") کشیده می‌شود و مجموع حداکثر وزن‌های مجاز دو وسیله نقلیه بیشتر از 3,500 کیلوگرم است"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1683",
      "question_text": "Sie haben einen Anhänger von Ihrem PKW abgekuppelt. Dürfen Sie den Anhänger allein auf der Fahrbahn abstellen?",
      "answers": [
          "Ja, aber nur höchstens 10 Minuten lang",
          "Ja, aber nur für die Dauer des Be- und Entladens des Anhängers",
          "Ja, aber nur bei Tageslicht",
          "Ja, aber nur, wenn kein eigener Parkplatz verfügbar ist"
      ],
      "correct_answers": [
          "Ja, aber nur für die Dauer des Be- und Entladens des Anhängers"
      ],
      "question_text_fa": "شما یک تریلر را از خودرو سواری خود جدا کرده‌اید. آیا مجاز به پارک کردن تریلر به تنهایی در جاده هستید؟",
      "answers_fa": [
          "بله، اما فقط حداکثر برای 10 دقیقه",
          "بله، اما فقط برای مدت زمان بارگیری یا تخلیه تریلر",
          "بله، اما فقط در طول روز",
          "بله، اما فقط در صورتی که پارکینگ جداگانه‌ای موجود نباشد"
      ],
      "correct_answers_fa": [
          "بله، اما فقط برای مدت زمان بارگیری یا تخلیه تریلر"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1770",
      "question_text": "Sie wollen in einem Klein-LKW eine schwere Ladung befördern. Was müssen Sie dabei beachten?",
      "answers": [
          "Dass das höchste zulässige Gesamtgewicht des LKW nicht überschritten wird",
          "Dass die höchsten zulässigen Achslasten des LKW nicht überschritten werden",
          "Dass die Ladung so gesichert ist, dass sie auch bei Notbrems- und Ausweichmanövern nicht verrutschen kann",
          "Dass sich die Ladung möglichst weit hinten befindet"
      ],
      "correct_answers": [
          "Dass das höchste zulässige Gesamtgewicht des LKW nicht überschritten wird",
          "Dass die höchsten zulässigen Achslasten des LKW nicht überschritten werden",
          "Dass die Ladung so gesichert ist, dass sie auch bei Notbrems- und Ausweichmanövern nicht verrutschen kann"
      ],
      "question_text_fa": "شما می‌خواهید در یک کامیون کوچک یک بار سنگین حمل کنید. به چه نکاتی باید توجه کنید؟",
      "answers_fa": [
          "این که حداکثر وزن مجاز کامیون نباید بیشتر شود",
          "این که حداکثر بارهای مجاز محورهای کامیون نباید بیشتر شود",
          "این که بار باید به گونه‌ای ایمن شود که حتی در مواقع ترمز اضطراری یا مانورهای تغییر مسیر جابه‌جا نشود",
          "این که بار تا حد امکان در قسمت عقب قرار گیرد"
      ],
      "correct_answers_fa": [
          "این که حداکثر وزن مجاز کامیون نباید بیشتر شود",
          "این که حداکثر بارهای مجاز محورهای کامیون نباید بیشتر شود",
          "این که بار باید به گونه‌ای ایمن شود که حتی در مواقع ترمز اضطراری یا مانورهای تغییر مسیر جابه‌جا نشود"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1771",
      "question_text": "Sie wollen in einem Klein-LKW eine schwere Ladung befördern. Mit welchen Änderungen im Fahrverhalten müssen Sie dabei rechnen?",
      "answers": [
          "Der Überholweg wird länger",
          "Der LKW kippt bei plötzlichen Ausweichmanövern leichter um",
          "Der LKW kann in Kurven leichter ins Schleudern kommen",
          "Der Bremsweg wird kürzer"
      ],
      "correct_answers": [
          "Der Überholweg wird länger",
          "Der LKW kippt bei plötzlichen Ausweichmanövern leichter um",
          "Der LKW kann in Kurven leichter ins Schleudern kommen"
      ],
      "question_text_fa": "شما می‌خواهید در یک کامیون کوچک یک بار سنگین حمل کنید. باید با چه تغییراتی در رفتار رانندگی مواجه شوید؟",
      "answers_fa": [
          "مسیر سبقت‌گیری طولانی‌تر خواهد شد",
          "کامیون در هنگام مانورهای ناگهانی تغییر مسیر راحت‌تر واژگون می‌شود",
          "کامیون در پیچ‌ها راحت‌تر دچار لغزش می‌شود",
          "مسیر ترمزگیری کوتاه‌تر خواهد شد"
      ],
      "correct_answers_fa": [
          "مسیر سبقت‌گیری طولانی‌تر خواهد شد",
          "کامیون در هنگام مانورهای ناگهانی تغییر مسیر راحت‌تر واژگون می‌شود",
          "کامیون در پیچ‌ها راحت‌تر دچار لغزش می‌شود"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1772",
      "question_text": "Sie wollen auf der Ladefläche dieses Kombi Ladung transportieren. Welche Gewichtsgrenzen müssen Sie dabei beachten?",
      "answers": [
          "Das Fahrzeug samt Ladung und beförderten Personen darf nicht schwerer als 3.240 kg sein",
          "Das Gewicht der Ladung auf der Ladefläche darf nicht höher als 500 kg sein",
          "Die höchsten zulässigen Achslasten dürfen nicht überschritten werden",
          "Das Gewicht der Ladung auf der Ladefläche darf nicht höher als 150 kg sein"
      ],
      "correct_answers": [
          "Das Fahrzeug samt Ladung und beförderten Personen darf nicht schwerer als 3.240 kg sein",
          "Das Gewicht der Ladung auf der Ladefläche darf nicht höher als 500 kg sein",
          "Die höchsten zulässigen Achslasten dürfen nicht überschritten werden"
      ],
      "question_text_fa": "شما می‌خواهید روی بارگیر این خودروی ترکیبی بار حمل کنید. چه محدودیت‌های وزنی باید در نظر گرفته شود؟",
      "answers_fa": [
          "وزن خودرو به همراه بار و افراد نباید از ۳,۲۴۰ کیلوگرم بیشتر باشد",
          "وزن بار روی بارگیر نباید بیش از ۵۰۰ کیلوگرم باشد",
          "بالاترین مجاز بودن بار محوری نباید تجاوز شود",
          "وزن بار روی بارگیر نباید بیشتر از ۱۵۰ کیلوگرم باشد"
      ],
      "correct_answers_fa": [
          "وزن خودرو به همراه بار و افراد نباید از ۳,۲۴۰ کیلوگرم بیشتر باشد",
          "وزن بار روی بارگیر نباید بیش از ۵۰۰ کیلوگرم باشد",
          "بالاترین مجاز بودن بار محوری نباید تجاوز شود"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1773",
      "question_text": "Sie transportieren eine 500 kg schwere Ladung auf der Ladefläche dieses Kombi. Was müssen Sie dabei beachten?",
      "answers": [
          "Ich sichere die Ladung so, dass die transportierten Gegenstände weder seitlich, noch nach vorne oder nach hinten verrutschen können",
          "Ich verteile die Last möglichst gleichmäßig auf der Ladefläche",
          "Ich sichere die Ladung mit geeigneten Zurrmitteln",
          "Ich versuche, einen Formschluss mit dem Fahrzeugaufbau und innerhalb der Ladung herzustellen"
      ],
      "correct_answers": [
          "Ich sichere die Ladung so, dass die transportierten Gegenstände weder seitlich, noch nach vorne oder nach hinten verrutschen können",
          "Ich verteile die Last möglichst gleichmäßig auf der Ladefläche",
          "Ich sichere die Ladung mit geeigneten Zurrmitteln",
          "Ich versuche, einen Formschluss mit dem Fahrzeugaufbau und innerhalb der Ladung herzustellen"
      ],
      "question_text_fa": "شما یک بار ۵۰۰ کیلوگرمی روی بارگیر این خودروی ترکیبی حمل می‌کنید. به چه نکاتی باید توجه کنید؟",
      "answers_fa": [
          "من بار را طوری ایمن می‌کنم که اقلام حمل شده نه به سمت‌های کناری و نه به جلو یا عقب حرکت کنند",
          "من بار را به طور یکنواخت روی بارگیر توزیع می‌کنم",
          "من بار را با استفاده از تجهیزات مناسب ایمن می‌کنم",
          "من سعی می‌کنم یک تماس شکلی بین بدنه خودرو و داخل بار ایجاد کنم"
      ],
      "correct_answers_fa": [
          "من بار را طوری ایمن می‌کنم که اقلام حمل شده نه به سمت‌های کناری و نه به جلو یا عقب حرکت کنند",
          "من بار را به طور یکنواخت روی بارگیر توزیع می‌کنم",
          "من بار را با استفاده از تجهیزات مناسب ایمن می‌کنم",
          "من سعی می‌کنم یک تماس شکلی بین بدنه خودرو و داخل بار ایجاد کنم"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1780",
      "question_text": "Welche Einrichtungen können bei einem Unfall Personen in einem PKW vor Verletzungen schützen?",
      "answers": [
          "Sicherheitsgurte",
          "Kopfstützen",
          "Airbags",
          "Autoradios mit Verkehrsfunk"
      ],
      "correct_answers": [
          "Sicherheitsgurte",
          "Kopfstützen",
          "Airbags"
      ],
      "question_text_fa": "چه تجهیزاتی می‌توانند در تصادف افراد داخل یک خودروی سواری را از آسیب محافظت کنند؟",
      "answers_fa": [
          "کمربندهای ایمنی",
          "سرتکیه‌ها",
          "کیسه‌های هوا",
          "رادیوهای خودرو با اطلاعات ترافیکی"
      ],
      "correct_answers_fa": [
          "کمربندهای ایمنی",
          "سرتکیه‌ها",
          "کیسه‌های هوا"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1781",
      "question_text": "Sie benützen die Sicherheitsgurte in einem PKW. Was müssen Sie dabei beachten?",
      "answers": [
          "Sicherheitsgurte sind so anzulegen, dass sie straff angezogen sind",
          "Die Oberkante der Kopfstütze soll mit der Scheitelhöhe abschließen",
          "Die Oberkante der Kopfstütze darf nicht höher als der Kopfansatz sein",
          "Sicherheitsgurte müssen möglichst locker angelegt werden"
      ],
      "correct_answers": [
          "Sicherheitsgurte sind so anzulegen, dass sie straff angezogen sind",
          "Die Oberkante der Kopfstütze soll mit der Scheitelhöhe abschließen"
      ],
      "question_text_fa": "شما از کمربندهای ایمنی در یک خودروی سواری استفاده می‌کنید. به چه نکاتی باید توجه کنید؟",
      "answers_fa": [
          "کمربندهای ایمنی باید طوری بسته شوند که محکم کشیده شوند",
          "لبه بالایی سرتکیه باید با ارتفاع سر هم‌سطح باشد",
          "لبه بالایی سرتکیه نباید بالاتر از ابتدای سر باشد",
          "کمربندهای ایمنی باید به‌صورت شل بسته شوند"
      ],
      "correct_answers_fa": [
          "کمربندهای ایمنی باید طوری بسته شوند که محکم کشیده شوند",
          "لبه بالایی سرتکیه باید با ارتفاع سر هم‌سطح باشد"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1782",
      "question_text": "Sie kuppeln einen Anhänger an Ihren PKW an. Was müssen Sie danach kontrollieren?",
      "answers": [
          "Ob die Kupplung richtig geschlossen und gesichert ist",
          "Ob am Anhänger Beleuchtung, Blinker und Bremslicht funktionieren",
          "Ob das Stützrad bzw. die Anhängerstützen hochgezogen sind",
          "Ob die Abreißsicherung am PKW richtig befestigt ist"
      ],
      "correct_answers": [
          "Ob die Kupplung richtig geschlossen und gesichert ist",
          "Ob am Anhänger Beleuchtung, Blinker und Bremslicht funktionieren",
          "Ob das Stützrad bzw. die Anhängerstützen hochgezogen sind",
          "Ob die Abreißsicherung am PKW richtig befestigt ist"
      ],
      "question_text_fa": "شما یک تریلر به خودروی سواری خود وصل کرده‌اید. بعد از آن باید چه چیزی را بررسی کنید؟",
      "answers_fa": [
          "آیا اتصال درست بسته و ایمن شده است",
          "آیا چراغ‌ها، راهنما و چراغ ترمز در تریلر کار می‌کنند",
          "آیا چرخ کمکی یا پایه‌های تریلر بالا کشیده شده‌اند",
          "آیا سیم قطع‌کن ایمنی به درستی به خودرو وصل شده است"
      ],
      "correct_answers_fa": [
          "آیا اتصال درست بسته و ایمن شده است",
          "آیا چراغ‌ها، راهنما و چراغ ترمز در تریلر کار می‌کنند",
          "آیا چرخ کمکی یا پایه‌های تریلر بالا کشیده شده‌اند",
          "آیا سیم قطع‌کن ایمنی به درستی به خودرو وصل شده است"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1783",
      "question_text": "Sie haben einen Anhänger beladen. Welchen Einfluss hat die Lastverteilung auf das Fahrverhalten?",
      "answers": [
          "Wenn schwere Lasten nicht über der Achse liegen, kann ein einachsiger Anhänger eher zu pendeln beginnen",
          "Wenn die Deichsellast zu klein ist, kann der Anhänger eher zu pendeln beginnen",
          "Keinen, es ist nur zu beachten, dass das höchste zulässige Gesamtgewicht des Anhängers nicht überschritten wird",
          "Wenn die Deichsellast zu klein ist, öffnet sich die Anhängekupplung"
      ],
      "correct_answers": [
          "Wenn schwere Lasten nicht über der Achse liegen, kann ein einachsiger Anhänger eher zu pendeln beginnen",
          "Wenn die Deichsellast zu klein ist, kann der Anhänger eher zu pendeln beginnen"
      ],
      "question_text_fa": "شما یک تریلر بارگیری کرده‌اید. چگونه توزیع بار بر رفتار رانندگی تأثیر می‌گذارد؟",
      "answers_fa": [
          "اگر بارهای سنگین روی محور نباشند، تریلر تک‌محور ممکن است بیشتر به نوسان بیافتد",
          "اگر فشار یقه اتصال کم باشد، تریلر ممکن است به نوسان بیافتد",
          "هیچ‌گونه، فقط باید اطمینان حاصل کرد که حداکثر وزن مجاز تریلر تجاوز نشود",
          "اگر فشار یقه اتصال کم باشد، اتصال تریلر باز می‌شود"
      ],
      "correct_answers_fa": [
          "اگر بارهای سنگین روی محور نباشند، تریلر تک‌محور ممکن است بیشتر به نوسان بیافتد",
          "اگر فشار یقه اتصال کم باشد، تریلر ممکن است به نوسان بیافتد"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1786",
      "question_text": "Wie verhalten Sie sich, wenn Sie mit Ihrem PKW einen Wohnwagen ziehen?",
      "answers": [
          "Ich halte beim Hintereinanderfahren mehr Abstand als gewohnt",
          "Ich berücksichtige beim Überholen, dass der Überholweg länger als gewohnt ist",
          "Ich fahre bei Seitenwind langsamer",
          "Ich schalte früher als gewohnt auf einen höheren Gang"
      ],
      "correct_answers": [
          "Ich halte beim Hintereinanderfahren mehr Abstand als gewohnt",
          "Ich berücksichtige beim Überholen, dass der Überholweg länger als gewohnt ist",
          "Ich fahre bei Seitenwind langsamer"
      ],
      "question_text_fa": "چگونه رفتار می‌کنید وقتی با خودروی سواری خود یک کاروان می‌کشید؟",
      "answers_fa": [
          "من در هنگام رانندگی پشت‌سر هم بیشتر از حد معمول فاصله می‌گیرم",
          "من هنگام سبقت گرفتن، در نظر دارم که مسیر سبقت بیشتر از حد معمول است",
          "من در باد جانبی آهسته‌تر رانندگی می‌کنم",
          "من زودتر از حد معمول به دنده بالاتر تغییر می‌دهم"
      ],
      "correct_answers_fa": [
          "من در هنگام رانندگی پشت‌سر هم بیشتر از حد معمول فاصله می‌گیرم",
          "من هنگام سبقت گرفتن، در نظر دارم که مسیر سبقت بیشتر از حد معمول است",
          "من در باد جانبی آهسته‌تر رانندگی می‌کنم"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1787",
      "question_text": "Sie wollen einen Wohnwagen ziehen, der wesentlich breiter als Ihr PKW ist. Was tun Sie vor Antritt der Fahrt?",
      "answers": [
          "Ich montiere am PKW zusätzliche Rückspiegel",
          "Ich achte darauf, dass schwere Gegenstände über der Achse des Anhängers geladen sind",
          "Ich belade den Anhänger so, dass die Deichsellast möglichst gering ist",
          "Ich lade alle schweren Gegenstände in den Kofferraum des PKW und nicht in den Anhänger"
      ],
      "correct_answers": [
          "Ich montiere am PKW zusätzliche Rückspiegel",
          "Ich achte darauf, dass schwere Gegenstände über der Achse des Anhängers geladen sind"
      ],
      "question_text_fa": "شما می‌خواهید یک کاروان بکشید که بسیار پهن‌تر از خودروی سواری شما است. قبل از شروع سفر چه کاری باید انجام دهید؟",
      "answers_fa": [
          "من آینه‌های اضافی به خودروی سواری خود نصب می‌کنم",
          "من اطمینان حاصل می‌کنم که بارهای سنگین روی محور تریلر قرار گرفته‌اند",
          "من تریلر را طوری بارگیری می‌کنم که فشار یقه اتصال حداقل باشد",
          "من تمام بارهای سنگین را در صندوق عقب خودرو می‌گذارم و نه در تریلر"
      ],
      "correct_answers_fa": [
          "من آینه‌های اضافی به خودروی سواری خود نصب می‌کنم",
          "من اطمینان حاصل می‌کنم که بارهای سنگین روی محور تریلر قرار گرفته‌اند"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1788",
      "question_text": "Sie ziehen mit Ihrem PKW einen einachsigen Anhänger. Der Anhänger beginnt während der Fahrt zu pendeln. Wie verhalten Sie sich?",
      "answers": [
          "Ich bremse sofort stark ab",
          "Ich gebe sofort Vollgas",
          "Ich beginne sofort mit starken Lenkbewegungen",
          "Ich kupple sofort aus"
      ],
      "correct_answers": [
          "Ich bremse sofort stark ab"
      ],
      "question_text_fa": "شما با خودروی سواری خود یک تریلر تک‌محور می‌کشید. در طول رانندگی، تریلر به نوسان می‌افتد. چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "من فوراً ترمز شدید می‌کنم",
          "من فوراً گاز را تا آخر فشار می‌دهم",
          "من فوراً حرکات فرمانی شدید انجام می‌دهم",
          "من فوراً کلاچ را می‌گیرم"
      ],
      "correct_answers_fa": [
          "من فوراً ترمز شدید می‌کنم"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1789",
      "question_text": "Sie wollen mit Ihrem PKW einen einachsigen Anhänger ziehen. Was beachten Sie bei der Beladung des Anhängers?",
      "answers": [
          "Dass die Deichsellast des Anhängers nicht höher als die zulässige Stützlast des Zugfahrzeuges ist",
          "Dass schwere Gegenstände über der Achse des Anhängers geladen sind",
          "Dass schwere Gegenstände möglichst hinten im Anhänger geladen sind",
          "Dass die Deichsellast des Anhängers möglichst gering ist"
      ],
      "correct_answers": [
          "Dass die Deichsellast des Anhängers nicht höher als die zulässige Stützlast des Zugfahrzeuges ist",
          "Dass schwere Gegenstände über der Achse des Anhängers geladen sind"
      ],
      "question_text_fa": "شما می‌خواهید با خودروی خود یک تریلر یک محور را بکشانید. چه نکاتی را در هنگام بارگذاری تریلر در نظر می‌گیرید؟",
      "answers_fa": [
          "اینکه بارکشی تریلر از بار حداکثر مجاز خودروی کشنده بالاتر نباشد",
          "اینکه اشیای سنگین بر روی محور تریلر بارگذاری شوند",
          "اینکه اشیای سنگین تا حد ممکن در انتهای تریلر بارگذاری شوند",
          "اینکه بارکشی تریلر تا حد ممکن کم باشد"
      ],
      "correct_answer_fa": [
          "اینکه بارکشی تریلر از بار حداکثر مجاز خودروی کشنده بالاتر نباشد",
          "اینکه اشیای سنگین بر روی محور تریلر بارگذاری شوند"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1790",
      "question_text": "Sie fahren mit Ihrem PKW eine längere Strecke bergab. Sie ziehen einen Wohnwagen mit einer Auflaufbremse. Welche Gefahren können entstehen und wie verhalten Sie sich?",
      "answers": [
          "Wenn der Anhänger dauernd bremst, kann die Bremse überhitzen und ausfallen",
          "Wenn ich ein Überhitzen der Anhängerbremse befürchte, werde ich eine Pause einlegen",
          "Der Anhänger bremst den PKW, ich muss öfters Gas geben",
          "Der Motor könnte überhitzen"
      ],
      "correct_answers": [
          "Wenn der Anhänger dauernd bremst, kann die Bremse überhitzen und ausfallen",
          "Wenn ich ein Überhitzen der Anhängerbremse befürchte, werde ich eine Pause einlegen"
      ],
      "question_text_fa": "شما با خودروی خود مسافت طولانی‌ را به سمت پایین می‌رانید. شما یک کاروان با ترمز خودکار می‌کشید. چه خطراتی ممکن است پیش بیاید و چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "اگر تریلر دائماً ترمز کند، ممکن است ترمز داغ شود و از کار بیفتد",
          "اگر نگران داغ شدن ترمز تریلر هستم، استراحت می‌کنم",
          "تریلر خودروی من را ترمز می‌کند، باید مرتباً گاز بدهم",
          "ممکن است موتور داغ شود"
      ],
      "correct_answer_fa": [
          "اگر تریلر دائماً ترمز کند، ممکن است ترمز داغ شود و از کار بیفتد",
          "اگر نگران داغ شدن ترمز تریلر هستم، استراحت می‌کنم"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1791",
      "question_text": "Sie wollen mit Ihrem PKW einen Wohnwagen ziehen. Was machen Sie vor Antritt der Fahrt?",
      "answers": [
          "Ich montiere am PKW entsprechende Rückspiegel",
          "Ich lade schwere Gegenstände über der Achse des Anhängers ein",
          "Ich belade den Anhänger so, dass die Deichsellast möglichst klein ist",
          "Ich lade alle schweren Gegenstände in den Kofferraum des PKW und nicht in den Anhänger"
      ],
      "correct_answers": [
          "Ich montiere am PKW entsprechende Rückspiegel",
          "Ich lade schwere Gegenstände über der Achse des Anhängers ein"
      ],
      "question_text_fa": "شما می‌خواهید با خودروی خود یک کاروان بکشید. قبل از حرکت چه کاری انجام می‌دهید؟",
      "answers_fa": [
          "من آینه‌های مناسب را بر روی خودرو نصب می‌کنم",
          "اشیای سنگین را بر روی محور تریلر بارگذاری می‌کنم",
          "تریلر را طوری بارگذاری می‌کنم که بارکشی آن تا حد ممکن کم باشد",
          "من تمام اشیای سنگین را در صندوق خودرو و نه در تریلر بارگذاری می‌کنم"
      ],
      "correct_answer_fa": [
          "من آینه‌های مناسب را بر روی خودرو نصب می‌کنم",
          "اشیای سنگین را بر روی محور تریلر بارگذاری می‌کنم"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "1873",
      "question_text": "Sie haben auf Ihrem PKW eine Dachbox montiert und bis zum zulässigen Gewicht beladen. Was müssen Sie beim Fahren besonders beachten?",
      "answers": [
          "Durch den höheren Schwerpunkt verschlechtert sich das Fahrverhalten des Fahrzeuges",
          "Bei Seitenwind muss ich wesentlich langsamer fahren",
          "Ich darf nicht stark bremsen, damit die Dachbox nicht abgeworfen wird",
          "Ich muss die Lenkung locker halten, damit der Fahrtwind das Fahrzeug stabil in der Richtung hält"
      ],
      "correct_answers": [
          "Durch den höheren Schwerpunkt verschlechtert sich das Fahrverhalten des Fahrzeuges",
          "Bei Seitenwind muss ich wesentlich langsamer fahren"
      ],
      "question_text_fa": "شما بر روی خودروی خود یک جعبه سقفی نصب کرده‌اید و تا حداکثر وزن مجاز بارگذاری کرده‌اید. هنگام رانندگی چه نکاتی را باید به‌ویژه در نظر بگیرید؟",
      "answers_fa": [
          "به دلیل مرکز ثقل بالاتر، رفتار رانندگی خودرو بدتر می‌شود",
          "در برابر بادهای جانبی باید بسیار آهسته‌تر رانندگی کنم",
          "نباید ناگهان ترمز بزنم تا جعبه سقفی نیفتد",
          "باید فرمان را شل نگه دارم تا باد سفر خودرو را در جهت درست نگه دارد"
      ],
      "correct_answer_fa": [
          "به دلیل مرکز ثقل بالاتر، رفتار رانندگی خودرو بدتر می‌شود",
          "در برابر بادهای جانبی باید بسیار آهسته‌تر رانندگی کنم"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2044",
      "question_text": "Sie befördern auf der offenen Ladefläche eines Pritschenfahrzeuges Baumaterial und Werkzeuge. Wie können Sie die Ladung richtig sichern?",
      "answers": [
          "Mit einer Abdeckung aus Karton",
          "Werkzeug verstaue ich am besten in einer Werkzeugbox, die fest mit dem Fahrzeug verschraubt ist",
          "Ich spanne ein geeignetes Netz über die gesamte Ladefläche",
          "Ich verwende Zurrgurte, um große Ladestücke zu befestigen"
      ],
      "correct_answers": [
          "Werkzeug verstaue ich am besten in einer Werkzeugbox, die fest mit dem Fahrzeug verschraubt ist",
          "Ich spanne ein geeignetes Netz über die gesamte Ladefläche",
          "Ich verwende Zurrgurte, um große Ladestücke zu befestigen"
      ],
      "question_text_fa": "شما در بارگیر باز یک خودرو کمپرسی مواد ساختمانی و ابزار می‌برید. چگونه می‌توانید بار را به‌درستی ایمن کنید؟",
      "answers_fa": [
          "با یک پوشش از مقوا",
          "بهترین راه برای قرار دادن ابزار در یک جعبه ابزار است که به‌طور محکم با خودرو پیچ شده است",
          "من یک شبکه مناسب بر روی کل بارگیر می‌کشم",
          "از بندهای ایمنی استفاده می‌کنم تا قطعات بزرگ بار را محکم کنم"
      ],
      "correct_answer_fa": [
          "بهترین راه برای قرار دادن ابزار در یک جعبه ابزار است که به‌طور محکم با خودرو پیچ شده است",
          "من یک شبکه مناسب بر روی کل بارگیر می‌کشم",
          "از بندهای ایمنی استفاده می‌کنم تا قطعات بزرگ بار را محکم کنم"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2045",
      "question_text": "Sie befördern auf der offenen Ladefläche eines Pritschenfahrzeuges feinen Sand. Was müssen Sie dabei beachten?",
      "answers": [
          "Ich muss den Sand mit einer Plane abdecken oder in geschlossenen Behältern befördern",
          "Ich darf die höchste zulässige Nutzlast des Fahrzeuges nicht überschreiten",
          "Ich darf die höchsten zulässigen Achslasten des Fahrzeuges nicht \u0000überschreiten",
          "Ich darf nur bei Windstille fahren"
      ],
      "correct_answers": [
          "Ich muss den Sand mit einer Plane abdecken oder in geschlossenen Behältern befördern",
          "Ich darf die höchste zulässige Nutzlast des Fahrzeuges nicht überschreiten",
          "Ich darf die höchsten zulässigen Achslasten des Fahrzeuges nicht \u0000überschreiten"
      ],
      "question_text_fa": "شما در بارگیر باز یک خودرو کمپرسی شن ریز حمل می‌کنید. در این مورد چه نکاتی را باید در نظر بگیرید؟",
      "answers_fa": [
          "من باید شن را با یک پوشش بپوشانم یا در ظرف‌های بسته حمل کنم",
          "نباید حداکثر بار مجاز خودرو را تجاوز کنم",
          "نباید بارهای محور مجاز خودرو را تجاوز کنم",
          "فقط باید در هوای بدون باد رانندگی کنم"
      ],
      "correct_answer_fa": [
          "من باید شن را با یک پوشش بپوشانم یا در ظرف‌های بسته حمل کنم",
          "نباید حداکثر بار مجاز خودرو را تجاوز کنم",
          "نباید بارهای محور مجاز خودرو را تجاوز کنم"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2046",
      "question_text": "Sie wollen in einem Kastenwagen eine einzelne schwere Kiste befördern. Wie sichern sie diese?",
      "answers": [
          "Mit einer Palette",
          "Indem ich die Kiste hinten an der Laderaumtüre anlehne",
          "Ich stelle die Last formschlüssig an die Trennwand zur Fahrerkabine",
          "Ich sichere die Last zusätzlich mit Zurrgurten oder einem Zurrnetz"
      ],
      "correct_answers": [
          "Ich stelle die Last formschlüssig an die Trennwand zur Fahrerkabine",
          "Ich sichere die Last zusätzlich mit Zurrgurten oder einem Zurrnetz"
      ],
      "question_text_fa": "شما می‌خواهید در یک ون یک جعبه سنگین تنها حمل کنید. چگونه آن را ایمن می‌کنید؟",
      "answers_fa": [
          "با یک پالت",
          "با تکیه دادن جعبه به درب عقب بارگیری",
          "بار را به‌طور مناسب به دیوار جدایی کابین راننده می‌زنم",
          "بار را همچنین با بندهای ایمنی یا یک شبکه ایمنی ایمن می‌کنم"
      ],
      "correct_answer_fa": [
          "بار را به‌طور مناسب به دیوار جدایی کابین راننده می‌زنم",
          "بار را همچنین با بندهای ایمنی یا یک شبکه ایمنی ایمن می‌کنم"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2047",
      "category": "B - Personenbeförderung, Ladung, Anhänger",
      "question_text": "Sie wollen in einem Kastenwagen eine einzelne schwere Kiste befördern. Warum sollte diese Kiste formschlüssig an der Stirnwand aufgestellt werden?",
      "answers": [
          "Damit die Tragfähigkeit der Stirnwand zur Ladungssicherung nach vorne genutzt werden kann.",
          "Damit das Be- und Entladen einfacher ist.",
          "Weil dann keine zusätzliche Sicherung gegen seitliches Umkippen erforderlich ist.",
          "Weil dann keine zusätzliche Sicherung gegen Umkippen nach rückwärts erforderlich ist."
      ],
      "correct_answers": [
          "Damit die Tragfähigkeit der Stirnwand zur Ladungssicherung nach vorne genutzt werden kann."
      ],
      "question_text_fa": "شما می‌خواهید یک جعبه سنگین را در یک وانت جابجا کنید. چرا باید این جعبه به طور منطبق با دیوار جلو قرار گیرد؟",
      "answers_fa": [
          "برای اینکه ظرفیت دیوار جلو برای تثبیت بار به جلو استفاده شود.",
          "برای اینکه بارگیری و تخلیه آسان‌تر باشد.",
          "چرا که دیگر نیازی به تثبیت اضافی برای جلوگیری از واژگونی جانبی نیست.",
          "چرا که دیگر نیازی به تثبیت اضافی برای جلوگیری از واژگونی به عقب نیست."
      ],
      "correct_answers_fa": [
          "برای اینکه ظرفیت دیوار جلو برای تثبیت بار به جلو استفاده شود."
      ]
  }
  ,
  {
      "question_number": "2071",
      "question_text": "Sie haben einen PKW-Anhänger abgekuppelt. Was beachten Sie danach?",
      "answers": [
          "Wenn der Anhänger gebremst ist, muss ich die Handbremse anziehen",
          "Ich muss die Deichsel zur Fahrbahnmitte ausrichten",
          "Ich muss die Deichsel in Fahrtrichtung ausrichten",
          "Ich lege bei einem schweren Anhänger den mitgeführten Unterlegkeil zur Absicherung an ein Rad"
      ],
      "correct_answers": [
          "Wenn der Anhänger gebremst ist, muss ich die Handbremse anziehen",
          "Ich lege bei einem schweren Anhänger den mitgeführten Unterlegkeil zur Absicherung an ein Rad"
      ],
      "question_text_fa": "شما یک تریلر خودرویی را جدا کرده‌اید. بعد از آن چه نکاتی را در نظر می‌گیرید؟",
      "answers_fa": [
          "اگر تریلر ترمز کرده باشد، باید ترمز دستی را بزنم",
          "باید بارکشی را به سمت مرکز جاده تنظیم کنم",
          "باید بارکشی را به سمت جلو تنظیم کنم",
          "در صورت وجود تریلر سنگین، باید زیرپایی را به یک چرخ قرار دهم"
      ],
      "correct_answer_fa": [
          "اگر تریلر ترمز کرده باشد، باید ترمز دستی را بزنم",
          "در صورت وجود تریلر سنگین، باید زیرپایی را به یک چرخ قرار دهم"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2072",
      "question_text": "Der LKW vor Ihnen fährt mit 60 km/h. Sie fahren mit Ihrem Wohnwagengespann mit 80 km/h. Wie werden Sie sich hier verhalten?",
      "answers": [
          "Ich werde nicht überholen, da ich die erforderliche Überholgeschwindigkeit am linken Fahrstreifen nicht mehr sicher fahren kann",
          "Ich halte einen Sicherheitsabstand von vier Sekunden ein",
          "Ich halte mindestens 50 m Abstand",
          "Ich halte mindestens 20 m Abstand"
      ],
      "correct_answers": [
          "Ich werde nicht überholen, da ich die erforderliche Überholgeschwindigkeit am linken Fahrstreifen nicht mehr sicher fahren kann",
          "Ich halte einen Sicherheitsabstand von vier Sekunden ein"
      ],
      "question_text_fa": "کامیون جلویی شما با سرعت 60 کیلومتر در ساعت حرکت می‌کند. شما با کاروان خود با سرعت 80 کیلومتر در ساعت حرکت می‌کنید. شما در اینجا چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "من بیش از آن نمی‌گذارم زیرا نمی‌توانم سرعت لازم برای عبور از لاین چپ را به‌خوبی حفظ کنم",
          "حداقل فاصله چهار ثانیه را حفظ می‌کنم",
          "حداقل فاصله 50 متر را حفظ می‌کنم",
          "حداقل فاصله 20 متر را حفظ می‌کنم"
      ],
      "correct_answers_fa": [
          "من بیش از آن نمی‌گذارم زیرا نمی‌توانم سرعت لازم برای عبور از لاین چپ را به‌خوبی حفظ کنم",
          "حداقل فاصله چهار ثانیه را حفظ می‌کنم"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2146",
      "question_text": "Sie wollen in Ihrem PKW ein kleines Kind in einem Reboard-Sitz befördern. Dürfen Sie das?",
      "answers": [
          "Ja, wenn der Beifahrerairbag ausgeschaltet ist",
          "Ja, wenn das Kind mit den Gurten für Erwachsene gesichert ist",
          "Nein",
          "Ja, wenn das Kind auf dem Schoß eines Erwachsenen sitzt"
      ],
      "correct_answers": [
          "Ja, wenn der Beifahrerairbag ausgeschaltet ist"
      ],
      "question_text_fa": "شما می‌خواهید یک کودک کوچک را در یک صندلی رو به عقب در خودروی شخصی خود حمل کنید. آیا مجاز به این کار هستید؟",
      "answers_fa": [
          "بله، اگر ایربگ صندلی جلو خاموش باشد",
          "بله، اگر کودک با کمربندهای بزرگسالان ایمن شده باشد",
          "خیر",
          "بله، اگر کودک روی زانوی یک بزرگسال نشسته باشد"
      ],
      "correct_answers_fa": [
          "بله، اگر ایربگ صندلی جلو خاموش باشد"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2172",
      "question_text": "Sie wollen in Ihrem PKW ein kleines Kind in einem Reboard-Sitz befördern. Warum muss dann der Beifahrer-Airbag ausgeschaltet sein?",
      "answers": [
          "Weil das Kind im Sitz bei einem Unfall nach hinten geschleudert werden würde",
          "Weil für das Kind im Sitz Lebensgefahr besteht",
          "Weil der Sitz bei einem Unfall den Airbag beschädigt",
          "Weil der Frontairbag im Falle eines Unfalls den Fahrer gefährden würde"
      ],
      "correct_answers": [
          "Weil das Kind im Sitz bei einem Unfall nach hinten geschleudert werden würde",
          "Weil für das Kind im Sitz Lebensgefahr besteht"
      ],
      "question_text_fa": "شما می‌خواهید یک کودک کوچک را در یک صندلی رو به عقب در خودروی شخصی خود حمل کنید. چرا باید ایربگ صندلی جلو خاموش باشد؟",
      "answers_fa": [
          "زیرا کودک در صندلی در صورت تصادف به عقب پرتاب می‌شود",
          "زیرا برای کودک در صندلی خطر جانی وجود دارد",
          "زیرا در صورت تصادف صندلی صدمه می‌بیند",
          "زیرا ایربگ جلو در صورت تصادف برای راننده خطرناک خواهد بود"
      ],
      "correct_answers_fa": [
          "زیرا کودک در صندلی در صورت تصادف به عقب پرتاب می‌شود",
          "زیرا برای کودک در صندلی خطر جانی وجود دارد"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2477",
      "category": "B - Fahrzeugtechnik, Winterbetrieb",
      "question_text": "Beachten Sie die Aufschriften am Reifen. Um welche Reifenart handelt es sich hier?",
      "answers": [
          "Um einen Winterreifen.",
          "Um einen Sommerreifen.",
          "Um einen Übergangsreifen.",
          "Um einen speziellen Reifen für LKW."
      ],
      "correct_answers": [
          "Um einen Winterreifen."
      ],
      "question_text_fa": "متن نوشته شده بر روی لاستیک را بررسی کنید. این لاستیک چه نوع لاستیکی است؟",
      "answers_fa": [
          "یک لاستیک زمستانی.",
          "یک لاستیک تابستانی.",
          "یک لاستیک انتقالی.",
          "یک لاستیک مخصوص کامیون."
      ],
      "correct_answers_fa": [
          "یک لاستیک زمستانی."
      ]
  }
  ,
  {
      "question_number": "2488",
      "category": "B - Fahrzeugtechnik, Winterbetrieb",
      "question_text": "Beachten Sie die Aufschriften am Reifen. In welchem Zeitraum dürfen Sie diesen Reifen verwenden?",
      "answers": [
          "Das ganze Jahr über.",
          "Nur vom 01. November bis zum 15. April jeden Jahres.",
          "Nur im Winter.",
          "Nur im Sommer."
      ],
      "correct_answers": [
          "Das ganze Jahr über."
      ],
      "question_text_fa": "نوشته‌های روی لاستیک را بررسی کنید. در چه بازه زمانی می‌توانید از این لاستیک استفاده کنید؟",
      "answers_fa": [
          "تمام طول سال.",
          "فقط از ۱ نوامبر تا ۱۵ آوریل هر سال.",
          "فقط در زمستان.",
          "فقط در تابستان."
      ],
      "correct_answers_fa": [
          "تمام طول سال."
      ]
  }
  
  ,
  {
      "question_number": "2628",
      "category": "B - Personenbeförderung, Ladung, Anhänger",
      "question_text": "Sie wollen für Ihren PKW ein Kinder-Rückhaltesystem kaufen. Was beachten Sie dabei?",
      "answers": [
          "Kinderrückhaltesysteme müssen die aktuellen Normen erfüllen.",
          "Kinderrückhaltesysteme werden nach der Körpergröße eingeteilt. Ich wähle danach ein passendes System aus.",
          "Kinderrückhaltesysteme werden nach Gewichtsklassen eingeteilt. Ich wähle danach ein passendes System aus.",
          "Die Farbe des Systems muss zum Innenraum passen."
      ],
      "correct_answers": [
          "Kinderrückhaltesysteme müssen die aktuellen Normen erfüllen.",
          "Kinderrückhaltesysteme werden nach der Körpergröße eingeteilt. Ich wähle danach ein passendes System aus.",
          "Kinderrückhaltesysteme werden nach Gewichtsklassen eingeteilt. Ich wähle danach ein passendes System aus."
      ],
      "question_text_fa": "شما قصد خرید یک سیستم نگهدارنده کودک برای خودروی خود را دارید. چه نکاتی را در نظر می‌گیرید؟",
      "answers_fa": [
          "سیستم‌های نگهدارنده کودک باید استانداردهای روز را رعایت کنند.",
          "سیستم‌های نگهدارنده کودک بر اساس قد تقسیم‌بندی می‌شوند. من یک سیستم مناسب را انتخاب می‌کنم.",
          "سیستم‌های نگهدارنده کودک بر اساس کلاس‌های وزنی تقسیم‌بندی می‌شوند. من یک سیستم مناسب را انتخاب می‌کنم.",
          "رنگ سیستم باید با داخل خودرو هماهنگ باشد."
      ],
      "correct_answers_fa": [
          "سیستم‌های نگهدارنده کودک باید استانداردهای روز را رعایت کنند.",
          "سیستم‌های نگهدارنده کودک بر اساس قد تقسیم‌بندی می‌شوند. من یک سیستم مناسب را انتخاب می‌کنم.",
          "سیستم‌های نگهدارنده کودک بر اساس کلاس‌های وزنی تقسیم‌بندی می‌شوند. من یک سیستم مناسب را انتخاب می‌کنم."
      ]
  }
  ,
  {
      "question_number": "2629",
      "question_text": "Sie wollen für Ihren PKW einen Kindersitz kaufen. Wie sollten Sie dabei vorgehen?",
      "answers": [
          "Ich werde mit dem Kind den Sitz in meinem PKW ausprobieren",
          "Ich lasse das Kind den Sitz aussuchen",
          "Ich lasse mir den Sitz vom Händler in meinem PKW vorführen. Damit kann ich prüfen, ob er in meinem PKW leicht montiert werden kann",
          "Wenn der Einbau kompliziert oder die Bedienungsanleitung unverständlich ist, werde ich einen anderen Sitz kaufen"
      ],
      "correct_answers": [
          "Ich werde mit dem Kind den Sitz in meinem PKW ausprobieren",
          "Ich lasse mir den Sitz vom Händler in meinem PKW vorführen. Damit kann ich prüfen, ob er in meinem PKW leicht montiert werden kann",
          "Wenn der Einbau kompliziert oder die Bedienungsanleitung unverständlich ist, werde ich einen anderen Sitz kaufen"
      ],
      "question_text_fa": "شما می‌خواهید یک صندلی کودک برای خودروی خود بخرید. چگونه باید در این مورد عمل کنید؟",
      "answers_fa": [
          "من صندلی را با کودک در خودروی خود امتحان می‌کنم",
          "می‌گذارم کودک صندلی را انتخاب کند",
          "از فروشنده می‌خواهم که صندلی را در خودروی من به نمایش بگذارد. این کار به من اجازه می‌دهد تا ببینم آیا نصب آن در خودروی من آسان است یا خیر",
          "اگر نصب آن پیچیده یا دستورالعمل‌ها غیرقابل فهم باشد، صندلی دیگری می‌خرم"
      ],
      "correct_answers_fa": [
          "من صندلی را با کودک در خودروی خود امتحان می‌کنم",
          "از فروشنده می‌خواهم که صندلی را در خودروی من به نمایش بگذارد. این کار به من اجازه می‌دهد تا ببینم آیا نصب آن در خودروی من آسان است یا خیر",
          "اگر نصب آن پیچیده یا دستورالعمل‌ها غیرقابل فهم باشد، صندلی دیگری می‌خرم"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2630",
      "question_text": "Wozu führen lockere Sicherheitsgurte oder nicht straff befestigte Kindersitze bei einem Aufprall?",
      "answers": [
          "Das Kind kann sich mit dem Kopf an harten Teilen des Innenraums oder an den eigenen Beinen verletzen",
          "Das Kind wird weich abgebremst",
          "Es wirken größere Verzögerungskräfte auf das Kind, schwerere Verletzungen sind die Folge",
          "Das Kind schwitzt im Sommer nicht so stark"
      ],
      "correct_answers": [
          "Das Kind kann sich mit dem Kopf an harten Teilen des Innenraums oder an den eigenen Beinen verletzen",
          "Es wirken größere Verzögerungskräfte auf das Kind, schwerere Verletzungen sind die Folge"
      ],
      "question_text_fa": "در هنگام تصادف، کمربندهای ایمنی شل یا صندلی‌های کودک ناپایدار چه عواقبی به همراه دارد؟",
      "answers_fa": [
          "کودک ممکن است با سر به اجزای سخت داخلی خودرو یا به پاهای خود آسیب ببیند",
          "کودک به آرامی متوقف می‌شود",
          "نیروهای بزرگ‌تری بر روی کودک اعمال می‌شود و آسیب‌های شدیدتری به وجود می‌آید",
          "کودک در تابستان به شدت عرق نمی‌کند"
      ],
      "correct_answers_fa": [
          "کودک ممکن است با سر به اجزای سخت داخلی خودرو یا به پاهای خود آسیب ببیند",
          "نیروهای بزرگ‌تری بر روی کودک اعمال می‌شود و آسیب‌های شدیدتری به وجود می‌آید"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2631",
      "question_text": "Durch welches Fehlverhalten können beförderte Kinder bei einem Unfall schwer verletzt werden?",
      "answers": [
          "Wenn das Kind auf dem Schoß eines Erwachsenen sitzt und nur festgehalten wird",
          "Wenn dem Kind eine dicke Jacke ausgezogen wird, bevor es in den Kindersitz gesetzt wird",
          "Wenn die Ladung im Kofferraum nicht ordnungsgemäß gesichert ist und deswegen auf die davorsitzenden Kinder prallt",
          "Wenn für die Montage eines rückwärtsgerichteten Kindersitzes der Frontairbag am Beifahrerplatz ausgeschaltet wird"
      ],
      "correct_answers": [
          "Wenn das Kind auf dem Schoß eines Erwachsenen sitzt und nur festgehalten wird",
          "Wenn die Ladung im Kofferraum nicht ordnungsgemäß gesichert ist und deswegen auf die davorsitzenden Kinder prallt"
      ],
      "question_text_fa": "کدام رفتار نادرست می‌تواند باعث آسیب جدی به کودکان حمل شده در یک تصادف شود؟",
      "answers_fa": [
          "اگر کودک بر روی زانوی یک بزرگسال بنشیند و فقط نگه داشته شود",
          "اگر کودک یک ژاکت ضخیم به تن نداشته باشد قبل از نشستن در صندلی کودک",
          "اگر بار در صندوق عقب به‌طور مناسب ایمن نشده باشد و به کودکان نشسته در جلو برخورد کند",
          "اگر برای نصب یک صندلی کودک رو به عقب، ایربگ جلو در صندلی جلو خاموش شود"
      ],
      "correct_answers_fa": [
          "اگر کودک بر روی زانوی یک بزرگسال بنشیند و فقط نگه داشته شود",
          "اگر بار در صندوق عقب به‌طور مناسب ایمن نشده باشد و به کودکان نشسته در جلو برخورد کند"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2632",
      "question_text": "Was bedeutet es, wenn diese Kontrollleuchte aufleuchtet?",
      "answers": [
          "Dass der Beifahrer-Airbag abgeschaltet ist",
          "Dass die Ladung im Fahrzeug nicht gesichert ist",
          "Dass der Kindersitz zu locker sitzt",
          "Dass ein Airbag oder Gurtstraffer defekt ist"
      ],
      "correct_answers": [
          "Dass der Beifahrer-Airbag abgeschaltet ist",
          "Dass ein Airbag oder Gurtstraffer defekt ist"
      ],
      "question_text_fa": "زمانی که این چراغ کنترل روشن می‌شود، چه معنی دارد؟",
      "answers_fa": [
          "این که ایربگ صندلی جلو خاموش شده است",
          "این که بار در خودرو ایمن نشده است",
          "این که صندلی کودک خیلی شل است",
          "این که ایربگ یا کشش‌کننده کمربند دچار نقص است"
      ],
      "correct_answers_fa": [
          "این که ایربگ صندلی جلو خاموش شده است",
          "این که ایربگ یا کشش‌کننده کمربند دچار نقص است"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2633",
      "question_text": "Wann sollten Sie den Beifahrer-Airbag abschalten?",
      "answers": [
          "Wenn der Beifahrer schwerer als 100 kg ist",
          "Wenn der Beifahrer angeschnallt ist",
          "Wenn ich am Beifahrersitz einen Reboard-Kindersitz verwende",
          "Wenn sich der Beifahrer nicht anschnallen möchte"
      ],
      "correct_answers": [
          "Wenn ich am Beifahrersitz einen Reboard-Kindersitz verwende"
      ],
      "question_text_fa": "چه زمانی باید ایربگ صندلی جلو خاموش شود؟",
      "answers_fa": [
          "اگر ایربگ صندلی جلو سنگین‌تر از 100 کیلوگرم باشد",
          "اگر ایربگ صندلی جلو نشسته باشد",
          "اگر در صندلی جلو از یک صندلی کودک رو به عقب استفاده کنم",
          "اگر سرنشین صندلی جلو نمی‌خواهد کمربند را ببندد"
      ],
      "correct_answers_fa": [
          "اگر در صندلی جلو از یک صندلی کودک رو به عقب استفاده کنم"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2724",
      "category": "B - Personenbeförderung, Ladung, Anhänger",
      "question_text": "Sie wollen diese Fahrzeugkombination mit der Lenkberechtigung der Klasse B lenken. Worauf müssen Sie bei der Beladung des Anhängers achten?",
      "answers": [
          "Ich darf den Anhänger nur so beladen, dass er nicht schwerer als 800 kg ist.",
          "Ich darf den Anhänger nur so beladen, dass die Deichsellast nicht höher als 60 kg ist.",
          "Ich darf den Anhänger nur so beladen, dass er nicht schwerer als 1.370 kg ist.",
          "Ich darf den Anhänger nur so beladen, dass die Deichsellast nicht kleiner als 60 kg ist."
      ],
      "correct_answers": [
          "Ich darf den Anhänger nur so beladen, dass er nicht schwerer als 800 kg ist.",
          "Ich darf den Anhänger nur so beladen, dass die Deichsellast nicht höher als 60 kg ist."
      ],
      "question_text_fa": "شما قصد دارید این ترکیب خودرو را با گواهینامه کلاس B هدایت کنید. در هنگام بارگذاری تریلر باید به چه نکاتی توجه کنید؟",
      "answers_fa": [
          "من فقط می‌توانم تریلر را به گونه‌ای بارگذاری کنم که وزن آن بیشتر از 800 کیلوگرم نباشد.",
          "من فقط می‌توانم تریلر را به گونه‌ای بارگذاری کنم که نیروی کشش از 60 کیلوگرم بیشتر نباشد.",
          "من فقط می‌توانم تریلر را به گونه‌ای بارگذاری کنم که وزن آن بیشتر از 1.370 کیلوگرم نباشد.",
          "من فقط می‌توانم تریلر را به گونه‌ای بارگذاری کنم که نیروی کشش کمتر از 60 کیلوگرم نباشد."
      ],
      "correct_answers_fa": [
          "من فقط می‌توانم تریلر را به گونه‌ای بارگذاری کنم که وزن آن بیشتر از 800 کیلوگرم نباشد.",
          "من فقط می‌توانم تریلر را به گونه‌ای بارگذاری کنم که نیروی کشش از 60 کیلوگرم بیشتر نباشد."
      ]
  }
  ,
  {
      "question_number": "2725",
      "category": "B - Personenbeförderung, Ladung, Anhänger",
      "question_text": "Sie wollen diese Fahrzeugkombination mit der Lenkberechtigung der Klasse B lenken. Warum darf der Anhänger nicht schwerer als 800 kg sein?",
      "answers": [
          "Weil sonst die höchste zulässige Anhängelast am PKW überschritten wird.",
          "Weil sonst die höchste zulässige Stützlast am PKW überschritten wird.",
          "Weil sonst die Lenkberechtigung der Klasse B nicht mehr ausreicht.",
          "Weil sonst die höchste zulässige Nutzlast am Anhänger überschritten wird."
      ],
      "correct_answers": [
          "Weil sonst die höchste zulässige Anhängelast am PKW überschritten wird."
      ],
      "question_text_fa": "شما قصد دارید این ترکیب خودرو را با گواهینامه کلاس B هدایت کنید. چرا نباید وزن تریلر بیشتر از 800 کیلوگرم باشد؟",
      "answers_fa": [
          "زیرا در این صورت حداکثر وزن مجاز یدک کشیدن خودرو از حد مجاز تجاوز می‌کند.",
          "زیرا در این صورت حداکثر بار مجاز حمایت خودرو از حد مجاز تجاوز می‌کند.",
          "زیرا در این صورت گواهینامه کلاس B دیگر کافی نخواهد بود.",
          "زیرا در این صورت حداکثر بار مجاز تریلر از حد مجاز تجاوز می‌کند."
      ],
      "correct_answers_fa": [
          "زیرا در این صورت حداکثر وزن مجاز یدک کشیدن خودرو از حد مجاز تجاوز می‌کند."
      ]
  }
  ,
  {
      "question_number": "2756",
      "category": "B - Personenbeförderung, Ladung, Anhänger",
      "question_text": "Sie laden den Kofferraum eines Kombi voll. Worauf achten Sie dabei, um eine optimale Ladungssicherung zu erreichen?",
      "answers": [
          "Ich lade nur bis zur Höhe der Lehne der Rückbank als Abgrenzung zwischen Kofferraum und Fahrgastraum.",
          "Ich sichere die Ladung zusätzlich mit einem Zurrnetz.",
          "Bei einer unbesetzten zweiten Sitzreihe kann ich die Lehne der Rückbank mit den über Kreuz angelegten Sicherheitsgurten sichern.",
          "Wenn die Ladung nicht höher als die Rückbanklehne ist, benötige ich keine Ladungssicherung."
      ],
      "correct_answers": [
          "Ich lade nur bis zur Höhe der Lehne der Rückbank als Abgrenzung zwischen Kofferraum und Fahrgastraum.",
          "Ich sichere die Ladung zusätzlich mit einem Zurrnetz.",
          "Bei einer unbesetzten zweiten Sitzreihe kann ich die Lehne der Rückbank mit den über Kreuz angelegten Sicherheitsgurten sichern."
      ],
      "question_text_fa": "شما صندوق عقب یک خودروی استیشن واگن را پر می‌کنید. در هنگام بارگذاری به چه نکاتی توجه می‌کنید تا ایمنی بار به طور بهینه تأمین شود؟",
      "answers_fa": [
          "من فقط تا ارتفاع پشتی صندلی عقب بارگذاری می‌کنم تا بین صندوق عقب و فضای سرنشینان تفکیک شود.",
          "من بار را با یک شبکه بستن اضافی ایمن می‌کنم.",
          "اگر ردیف دوم صندلی‌ها خالی باشد، می‌توانم پشتی صندلی عقب را با کمربندهای ایمنی که به صورت ضربدری بسته شده‌اند، ایمن کنم.",
          "اگر بار از ارتفاع پشتی صندلی عقب بالاتر نباشد، نیازی به ایمنی بار نیست."
      ],
      "correct_answers_fa": [
          "من فقط تا ارتفاع پشتی صندلی عقب بارگذاری می‌کنم تا بین صندوق عقب و فضای سرنشینان تفکیک شود.",
          "من بار را با یک شبکه بستن اضافی ایمن می‌کنم.",
          "اگر ردیف دوم صندلی‌ها خالی باشد، می‌توانم پشتی صندلی عقب را با کمربندهای ایمنی که به صورت ضربدری بسته شده‌اند، ایمن کنم."
      ]
  }
  ,
  {
      "question_number": "2757",
      "question_text": "Sie wollen in Ihrem PKW kleine Ladegüter wie Autopflegeprodukte oder Werkzeug verstauen. Wie befördern Sie dieses Ladegut?",
      "answers": [
          "Frei liegend im Kofferraum",
          "In den vorhandenen Ablagenetzen und Staufächern",
          "Ich verwende Behälter oder Taschen. Diese muss ich gegen Verrutschen sichern",
          "In einem Kofferraum-Ladesystem"
      ],
      "correct_answers": [
          "In den vorhandenen Ablagenetzen und Staufächern",
          "Ich verwende Behälter oder Taschen. Diese muss ich gegen Verrutschen sichern",
          "In einem Kofferraum-Ladesystem"
      ],
      "question_text_fa": "شما می‌خواهید در خودروی خود بارهای کوچک مانند محصولات مراقبت از خودرو یا ابزار را جا دهید. چگونه این بار را حمل می‌کنید؟",
      "answers_fa": [
          "به‌طور آزاد در صندوق عقب",
          "در شبکه‌های ذخیره‌سازی و محفظه‌های موجود",
          "من از ظرف‌ها یا کیف‌ها استفاده می‌کنم. این‌ها باید در برابر لغزش محکم شوند",
          "در یک سیستم بارگذاری صندوق عقب"
      ],
      "correct_answers_fa": [
          "در شبکه‌های ذخیره‌سازی و محفظه‌های موجود",
          "من از ظرف‌ها یا کیف‌ها استفاده می‌کنم. این‌ها باید در برابر لغزش محکم شوند",
          "در یک سیستم بارگذاری صندوق عقب"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2758",
      "question_text": "Sie erledigen den Lebensmitteleinkauf mit einem Kombi. Was beachten Sie beim Beladen, wenn Sie über keine rutschhemmende Unterlage verfügen?",
      "answers": [
          "Lebensmittel müssen nicht gesichert werden und können daher locker im Laderaum liegen",
          "Lebensmittel sollten in Kisten oder Kartons verstaut werden",
          "Die Transportkisten oder Kartons sollten formschlüssig vorne und seitlich an die Laderaumbegrenzungen gestellt werden",
          "Die Kisten oder Kartons sollten mit einem Zurrgurt gegen Verrutschen nach hinten gesichert werden"
      ],
      "correct_answers": [
          "Lebensmittel sollten in Kisten oder Kartons verstaut werden",
          "Die Transportkisten oder Kartons sollten formschlüssig vorne und seitlich an die Laderaumbegrenzungen gestellt werden",
          "Die Kisten oder Kartons sollten mit einem Zurrgurt gegen Verrutschen nach hinten gesichert werden"
      ],
      "question_text_fa": "شما با یک خودروی واگن خریدهای غذایی انجام می‌دهید. هنگام بارگذاری، اگر هیچ زیرپایی ضد لغزش نداشته باشید، به چه نکاتی توجه می‌کنید؟",
      "answers_fa": [
          "مواد غذایی نیاز به ایمنی ندارند و می‌توانند به راحتی در فضای بار قرار گیرند",
          "مواد غذایی باید در جعبه‌ها یا کارتن‌ها قرار داده شوند",
          "جعبه‌های حمل و کارتن‌ها باید به‌طور دقیق به جلو و جانبی به مرزهای فضای بار قرار گیرند",
          "جعبه‌ها یا کارتن‌ها باید با یک بند ایمنی در برابر لغزش به سمت عقب محکم شوند"
      ],
      "correct_answers_fa": [
          "مواد غذایی باید در جعبه‌ها یا کارتن‌ها قرار داده شوند",
          "جعبه‌های حمل و کارتن‌ها باید به‌طور دقیق به جلو و جانبی به مرزهای فضای بار قرار گیرند",
          "جعبه‌ها یا کارتن‌ها باید با یک بند ایمنی در برابر لغزش به سمت عقب محکم شوند"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2759",
      "category": "B - Personenbeförderung, Ladung, Anhänger",
      "question_text": "Sie erledigen den Lebensmitteleinkauf mit einem Kombi, dessen Laderaum eine rutschhemmende Unterlage hat. Was beachten Sie beim Beladen?",
      "answers": [
          "Es besteht kein Unterschied zur Sicherung ohne rutschhemmende Unterlage.",
          "Lücken zwischen den Transportkisten oder Kartons sollten ausgefüllt werden.",
          "Lebensmittel sollten in Kisten oder Kartons verstaut werden.",
          "Die Kisten oder Kartons müssen mit einem luftdichten Deckel versehen sein."
      ],
      "correct_answers": [
          "Lücken zwischen den Transportkisten oder Kartons sollten ausgefüllt werden.",
          "Lebensmittel sollten in Kisten oder Kartons verstaut werden."
      ],
      "question_text_fa": "شما خرید مواد غذایی را با یک خودرو استیشن واگن انجام می‌دهید که فضای بار آن دارای زیرانداز ضد لغزش است. هنگام بارگذاری به چه نکاتی توجه می‌کنید؟",
      "answers_fa": [
          "هیچ تفاوتی با ایمنی بارگذاری بدون زیرانداز ضد لغزش وجود ندارد.",
          "فاصله‌های بین جعبه‌ها یا کارتن‌های حمل باید پر شود.",
          "مواد غذایی باید در جعبه‌ها یا کارتن‌ها بسته بندی شوند.",
          "جعبه‌ها یا کارتن‌ها باید با درب محکم بسته شوند."
      ],
      "correct_answers_fa": [
          "فاصله‌های بین جعبه‌ها یا کارتن‌های حمل باید پر شود.",
          "مواد غذایی باید در جعبه‌ها یا کارتن‌ها بسته بندی شوند."
      ]
  }
  ,
  {
      "question_number": "2760",
      "question_text": "Sie müssen die Ladung in Ihrem PKW gesichert verstauen. Wie machen Sie das?",
      "answers": [
          "Ich lasse die Ladung locker hin und her rutschen",
          "Ich lade schwere Güter möglichst hoch oben",
          "Ich fülle Lücken zwischen einzelnen Teilen der Ladung mit geeignetem Material auf",
          "Ich decke das Ladegut mit einer Decke oder einer Plane ab"
      ],
      "correct_answers": [
          "Ich fülle Lücken zwischen einzelnen Teilen der Ladung mit geeignetem Material auf"
      ],
      "question_text_fa": "شما باید بار را در خودروی خود به‌طور ایمن جا دهید. چگونه این کار را انجام می‌دهید؟",
      "answers_fa": [
          "من اجازه می‌دهم بار به‌طور آزاد حرکت کند",
          "من بارهای سنگین را تا حد ممکن در بالا قرار می‌دهم",
          "من فاصله‌های بین اجزای بار را با مواد مناسب پر می‌کنم",
          "من بار را با یک پتوی یا روکش می‌پوشانم"
      ],
      "correct_answers_fa": [
          "من فاصله‌های بین اجزای بار را با مواد مناسب پر می‌کنم"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2761",
      "question_text": "Sie müssen die Ladung in Ihrem PKW so verstauen, dass damit keine Personen gefährdet werden. Wie machen Sie das?",
      "answers": [
          "Bei einem Kombi oder Van sollte die Ladung die Oberkante der Rückbanklehne nicht überragen",
          "Ladelücken sollten möglichst ausgefüllt werden",
          "Ich sollte rutschhemmende Unterlagen verwenden",
          "Werden gespitzte Gegenstände geladen, dann sollte das spitze Ende möglichst nicht in Fahrtrichtung zeigen"
      ],
      "correct_answers": [
          "Bei einem Kombi oder Van sollte die Ladung die Oberkante der Rückbanklehne nicht überragen",
          "Ladelücken sollten möglichst ausgefüllt werden",
          "Ich sollte rutschhemmende Unterlagen verwenden",
          "Werden gespitzte Gegenstände geladen, dann sollte das spitze Ende möglichst nicht in Fahrtrichtung zeigen"
      ],
      "question_text_fa": "شما باید بار را در خودروی خود طوری قرار دهید که هیچ فردی در خطر نباشد. چگونه این کار را انجام می‌دهید؟",
      "answers_fa": [
          "در یک خودروی واگن یا ون، بار نباید از بالای تکیه‌گاه صندلی عقب تجاوز کند",
          "فاصله‌های بار باید تا حد ممکن پر شود",
          "من باید از زیرپایی‌های ضد لغزش استفاده کنم",
          "اگر اشیاء تیز بارگذاری می‌شود، باید انتهای تیز آنها تا حد ممکن به سمت جلو قرار نگیرد"
      ],
      "correct_answers_fa": [
          "در یک خودروی واگن یا ون، بار نباید از بالای تکیه‌گاه صندلی عقب تجاوز کند",
          "فاصله‌های بار باید تا حد ممکن پر شود",
          "من باید از زیرپایی‌های ضد لغزش استفاده کنم",
          "اگر اشیاء تیز بارگذاری می‌شود، باید انتهای تیز آنها تا حد ممکن به سمت جلو قرار نگیرد"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2762",
      "question_text": "Sie wollen die Ladung in Ihrem Kombi mit einem Netz sichern. Was beachten Sie dabei?",
      "answers": [
          "Druckempfindliches Ladegut wird am besten durch Niederzurren gesichert",
          "Schwere Ladung wird am besten mit einem geeigneten Ladungssicherungsnetz gesichert",
          "Auf dem Etikett des Ladungssicherungsnetzes findet sich ein Hinweis, für welches Gewicht das Netz geeignet ist",
          "Druckempfindliches oder kippgefährdetes Ladegut kann am besten mit Ladungssicherungsnetzen gesichert werden"
      ],
      "correct_answers": [
          "Schwere Ladung wird am besten mit einem geeigneten Ladungssicherungsnetz gesichert",
          "Auf dem Etikett des Ladungssicherungsnetzes findet sich ein Hinweis, für welches Gewicht das Netz geeignet ist",
          "Druckempfindliches oder kippgefährdetes Ladegut kann am besten mit Ladungssicherungsnetzen gesichert werden"
      ],
      "question_text_fa": "شما می‌خواهید بار را در خودروی واگن خود با یک شبکه محکم کنید. به چه نکاتی توجه می‌کنید؟",
      "answers_fa": [
          "بهترین کار برای بار حساس به فشار، محکم کردن با کمربند است",
          "بار سنگین باید با یک شبکه ایمنی مناسب محکم شود",
          "بر روی برچسب شبکه ایمنی بار، اشاره‌ای به وزن مناسب آن وجود دارد",
          "بار حساس به فشار یا بارهایی که ممکن است واژگون شوند، بهترین کار با شبکه‌های ایمنی محکم می‌شود"
      ],
      "correct_answers_fa": [
          "بار سنگین باید با یک شبکه ایمنی مناسب محکم شود",
          "بر روی برچسب شبکه ایمنی بار، اشاره‌ای به وزن مناسب آن وجود دارد",
          "بار حساس به فشار یا بارهایی که ممکن است واژگون شوند، بهترین کار با شبکه‌های ایمنی محکم می‌شود"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2763",
      "question_text": "Sie sichern die Ladung in Ihrem Kombi mit einem Ladungssicherungsnetz. Was beachten Sie dabei?",
      "answers": [
          "Das verwendete Ladungssicherungsnetz muss für das Gewicht der Ladung geeignet sein",
          "Das verwendete Ladungssicherungsnetz muss eine andere Farbe als das Ladegut haben",
          "Das Ladungssicherungsnetz wird nur locker über die Ladung gelegt",
          "Das Ladungssicherungsnetz muss an den Zurrösen befestigt und nach unten gespannt werden"
      ],
      "correct_answers": [
          "Das verwendete Ladungssicherungsnetz muss für das Gewicht der Ladung geeignet sein",
          "Das Ladungssicherungsnetz muss an den Zurrösen befestigt und nach unten gespannt werden"
      ],
      "question_text_fa": "شما بار را در خودرو کامبی خود با استفاده از یک شبکه ایمنی بار تأمین می کنید. به چه نکاتی توجه می کنید؟",
      "answers_fa": [
          "شبکه ایمنی بار استفاده شده باید برای وزن بار مناسب باشد",
          "شبکه ایمنی بار استفاده شده باید رنگی متفاوت از بار داشته باشد",
          "شبکه ایمنی بار فقط به آرامی روی بار قرار داده می شود",
          "شبکه ایمنی بار باید به حلقه های قفل بسته شده و به سمت پایین کشیده شود"
      ],
      "correct_answer_fa": [
          "شبکه ایمنی بار استفاده شده باید برای وزن بار مناسب باشد",
          "شبکه ایمنی بار باید به حلقه های قفل بسته شده و به سمت پایین کشیده شود"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  
 
  {
      "question_number": "2766",
      "question_text": "Sie befördern Ladung in Ihrem Fahrzeug. Welche Grundsätze müssen Sie bei der Ladungssicherung beachten?",
      "answers": [
          "Sie muss auch dann das Verrutschen oder Kippen der Ladung verhindern, wenn ich das Fahrzeug verreißen muss",
          "Sie muss bei einer Vollbremsung das Verrutschen oder Kippen der Ladung verhindern",
          "Sie muss bei einem Aufprall das Rutschen der Ladung verhindern",
          "Sie muss die Ladung nur während der Beladung in Position halten"
      ],
      "correct_answers": [
          "Sie muss auch dann das Verrutschen oder Kippen der Ladung verhindern, wenn ich das Fahrzeug verreißen muss",
          "Sie muss bei einer Vollbremsung das Verrutschen oder Kippen der Ladung verhindern"
      ],
      "question_text_fa": "شما بار را در خودرو خود تأمین می کنید. چه اصولی باید در هنگام تأمین بار رعایت کنید؟",
      "answers_fa": [
          "باید در هر حال از سرخوردن یا کج شدن بار جلوگیری کند، حتی اگر مجبور به ترمز شدید شوم",
          "باید در هنگام ترمز کامل از سرخوردن یا کج شدن بار جلوگیری کند",
          "باید در صورت برخورد از سرخوردن بار جلوگیری کند",
          "فقط باید در حین بارگذاری بار را در موقعیت نگه دارد"
      ],
      "correct_answer_fa": [
          "باید در هر حال از سرخوردن یا کج شدن بار جلوگیری کند، حتی اگر مجبور به ترمز شدید شوم",
          "باید در هنگام ترمز کامل از سرخوردن یا کج شدن بار جلوگیری کند"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2767",
      "question_text": "Sie sichern die Ladung in Ihrem Fahrzeug. Mit welcher Art von Kräften müssen Sie dabei rechnen?",
      "answers": [
          "Mit den Kräften, welche die Ladung beim Bremsen nach vorne drücken",
          "Mit den Kräften, welche die Ladung in Kurven zur Seite drücken",
          "Mit den Kräften, welche die Ladung beim Beschleunigen nach hinten drücken",
          "Mit den Reibungskräften zwischen Packstücken"
      ],
      "correct_answers": [
          "Mit den Kräften, welche die Ladung beim Bremsen nach vorne drücken",
          "Mit den Kräften, welche die Ladung in Kurven zur Seite drücken",
          "Mit den Kräften, welche die Ladung beim Beschleunigen nach hinten drücken",
          "Mit den Reibungskräften zwischen Packstücken"
      ],
      "question_text_fa": "شما بار را در خودرو خود تأمین می کنید. با چه نوع قدرت‌هایی باید حساب کنید؟",
      "answers_fa": [
          "با قدرت‌هایی که بار را به جلو در حین ترمز فشار می دهند",
          "با قدرت‌هایی که بار را در پیچ ها به سمت کناره فشار می دهند",
          "با قدرت‌هایی که بار را در هنگام شتاب به عقب فشار می دهند",
          "با نیروهای اصطکاکی بین بسته ها"
      ],
      "correct_answer_fa": [
          "با قدرت‌هایی که بار را به جلو در حین ترمز فشار می دهند",
          "با قدرت‌هایی که بار را در پیچ ها به سمت کناره فشار می دهند",
          "با قدرت‌هایی که بار را در هنگام شتاب به عقب فشار می دهند",
          "با نیروهای اصطکاکی بین بسته ها"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2768",
      "category": "B - Personenbeförderung, Ladung, Anhänger",
      "question_text": "Sie sichern die Ladung in einem Klein-LKW. Welche Vorteile bringt die Verwendung von rutschhemmenden Unterlagen für die Ladungssicherung?",
      "answers": [
          "Der Reibwert zwischen Ladung und Ladefläche wird erhöht.",
          "Es sind wesentlich weniger Zurrmittel notwendig.",
          "In diesem Fall muss ich die höchste zulässige Nutzlast in der Zulassungsbescheinigung nicht mehr beachten.",
          "Die Ladung kann auch bei einem Unfall nicht verrutschen."
      ],
      "correct_answers": [
          "Der Reibwert zwischen Ladung und Ladefläche wird erhöht.",
          "Es sind wesentlich weniger Zurrmittel notwendig."
      ],
      "question_text_fa": "شما بار را در یک کامیون کوچک ایمن می‌کنید. استفاده از زیراندازهای ضد لغزش برای ایمنی بار چه مزایایی دارد؟",
      "answers_fa": [
          "مقدار اصطکاک بین بار و سطح بار افزایش می‌یابد.",
          "به طور قابل توجهی به تعداد کمتری از ابزارهای بستن نیاز است.",
          "در این صورت نیازی به رعایت حداکثر ظرفیت مجاز بار در گواهی ثبت وسیله نقلیه نیست.",
          "بار حتی در صورت وقوع تصادف نمی‌تواند جابجا شود."
      ],
      "correct_answers_fa": [
          "مقدار اصطکاک بین بار و سطح بار افزایش می‌یابد.",
          "به طور قابل توجهی به تعداد کمتری از ابزارهای بستن نیاز است."
      ]
  }
  ,
  {
      "question_number": "2769",
      "category": "B - Personenbeförderung, Ladung, Anhänger",
      "question_text": "Sie wollen die Ladung in Ihrem Klein-LKW mit rutschhemmenden Unterlagen sichern. Was beachten Sie dabei?",
      "answers": [
          "Dass das Ladegut den Boden des Laderaumes an keiner Stelle direkt berührt, sondern immer die rutschhemmende Unterlage dazwischen ist.",
          "Ich kann jede beliebige Unterlage verwenden.",
          "Rutschhemmende Unterlagen sollten auch zwischen die einzelnen Teile der Ladung gelegt werden.",
          "Dass das gesamte Ladegut rundherum mit rutschhemmenden Unterlagen verkleidet ist."
      ],
      "correct_answers": [
          "Dass das Ladegut den Boden des Laderaumes an keiner Stelle direkt berührt, sondern immer die rutschhemmende Unterlage dazwischen ist.",
          "Rutschhemmende Unterlagen sollten auch zwischen die einzelnen Teile der Ladung gelegt werden."
      ],
      "question_text_fa": "شما می‌خواهید بار را در کامیون کوچک خود با زیراندازهای ضد لغزش ایمن کنید. هنگام انجام این کار چه نکاتی را باید رعایت کنید؟",
      "answers_fa": [
          "بار نباید به طور مستقیم به کف فضای بار برخورد کند، بلکه همیشه باید زیرانداز ضد لغزش بین آن قرار گیرد.",
          "می‌توانم از هر نوع زیراندازی استفاده کنم.",
          "زیراندازهای ضد لغزش باید بین اجزای مختلف بار نیز قرار داده شوند.",
          "کل بار باید به طور کامل با زیراندازهای ضد لغزش پوشانده شود."
      ],
      "correct_answers_fa": [
          "بار نباید به طور مستقیم به کف فضای بار برخورد کند، بلکه همیشه باید زیرانداز ضد لغزش بین آن قرار گیرد.",
          "زیراندازهای ضد لغزش باید بین اجزای مختلف بار نیز قرار داده شوند."
      ]
  }
  ,
  {
      "question_number": "2772",
      "question_text": "Sie wollen die Ladung in Ihrem Klein-LKW mit einem Zurrgurt sichern. Was müssen Sie am Zurrgurt überprüfen?",
      "answers": [
          "Er darf nicht eingerissen sein",
          "Er muss ein Etikett aufweisen",
          "Das Spannelement des Zurrgurtes darf nicht stark korrodiert sein",
          "Er darf nicht länger als 1 Jahr verwendet werden"
      ],
      "correct_answers": [
          "Er darf nicht eingerissen sein",
          "Er muss ein Etikett aufweisen",
          "Das Spannelement des Zurrgurtes darf nicht stark korrodiert sein"
      ],
      "question_text_fa": "شما می خواهید بار را در کامیون کوچک خود با استفاده از یک بند زنجیری تأمین کنید. چه نکاتی باید در مورد بند زنجیری بررسی کنید؟",
      "answers_fa": [
          "نباید پاره شده باشد",
          "باید برچسب داشته باشد",
          "قسمت کششی بند زنجیری نباید به شدت زنگ زده باشد",
          "نباید بیشتر از 1 سال استفاده شود"
      ],
      "correct_answer_fa": [
          "نباید پاره شده باشد",
          "باید برچسب داشته باشد",
          "قسمت کششی بند زنجیری نباید به شدت زنگ زده باشد"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2773",
      "question_text": "Sie wollen die Ladung in Ihrem Klein-LKW durch Niederzurren sichern. Was beachten Sie dabei?",
      "answers": [
          "Dass die zulässige Vorspannkraft (STF) groß genug ist, um das Ladungsgewicht ausreichend zu sichern",
          "Bei scharfkantiger Ladung müssen die Zurrgurte durch Kantenschoner geschützt werden",
          "Das Gurtband muss sich mindestens vier Mal um die Spannrolle des Spannelementes gewickelt haben",
          "Die Ladung muss so stabil sein, dass sie durch das Niederzurren nicht beschädigt wird"
      ],
      "correct_answers": [
          "Dass die zulässige Vorspannkraft (STF) groß genug ist, um das Ladungsgewicht ausreichend zu sichern",
          "Bei scharfkantiger Ladung müssen die Zurrgurte durch Kantenschoner geschützt werden",
          "Die Ladung muss so stabil sein, dass sie durch das Niederzurren nicht beschädigt wird"
      ],
      "question_text_fa": "شما می خواهید بار را در کامیون کوچک خود با استفاده از فشار تأمین کنید. به چه نکاتی توجه می کنید؟",
      "answers_fa": [
          "که نیروی کششی مجاز (STF) به اندازه کافی بزرگ باشد تا وزن بار به خوبی تأمین شود",
          "برای بار با لبه های تیز، بند زنجیر باید با محافظ لبه محافظت شود",
          "بند باید حداقل چهار بار دور غلتک کششی پیچیده شود",
          "بار باید به قدری پایدار باشد که تحت فشار تأمین آسیب نبیند"
      ],
      "correct_answer_fa": [
          "که نیروی کششی مجاز (STF) به اندازه کافی بزرگ باشد تا وزن بار به خوبی تأمین شود",
          "برای بار با لبه های تیز، بند زنجیر باید با محافظ لبه محافظت شود",
          "بار باید به قدری پایدار باشد که تحت فشار تأمین آسیب نبیند"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2774",
      "question_text": "Welche Hilfsmittel können Sie zur Ladungssicherung benutzen?",
      "answers": [
          "Rutschhemmende Matten, die unter die Ladung gelegt werden",
          "Kantengleiter, die zwischen Zurrmittel und Ladung gelegt werden",
          "Gummibänder",
          "Geeignetes Material zum Füllen von Ladelücken"
      ],
      "correct_answers": [
          "Rutschhemmende Matten, die unter die Ladung gelegt werden",
          "Kantengleiter, die zwischen Zurrmittel und Ladung gelegt werden",
          "Geeignetes Material zum Füllen von Ladelücken"
      ],
      "question_text_fa": "کدام ابزارها می‌توانند برای تأمین بار استفاده شوند؟",
      "answers_fa": [
          "فرش‌های ضد لغزش که زیر بار گذاشته می‌شوند",
          "محافظ‌های لبه که بین مواد زنجیری و بار قرار می‌گیرند",
          "کش‌های لاستیکی",
          "مواد مناسب برای پر کردن فضای خالی بار"
      ],
      "correct_answer_fa": [
          "فرش‌های ضد لغزش که زیر بار گذاشته می‌شوند",
          "محافظ‌های لبه که بین مواد زنجیری و بار قرار می‌گیرند",
          "مواد مناسب برای پر کردن فضای خالی بار"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2775",
      "question_text": "Wann dürfen Sie einen Zurrgurt nicht zur Ladungssicherung verwenden?",
      "answers": [
          "Bei Einschnitten in lasttragenden Fasern über mehr als 10 % der Breite",
          "Bei Beschädigungen der Nähte",
          "Bei Verschmutzung des Gurtbandes",
          "Wenn er älter als 1 Jahr ist"
      ],
      "correct_answers": [
          "Bei Einschnitten in lasttragenden Fasern über mehr als 10 % der Breite",
          "Bei Beschädigungen der Nähte"
      ],
      "question_text_fa": "کی نباید از بند زنجیری برای تأمین بار استفاده کنید؟",
      "answers_fa": [
          "در صورت بریدگی در الیاف باربر بیش از 10 درصد عرض",
          "در صورت آسیب به درزها",
          "در صورت کثیف بودن بند",
          "اگر بیش از 1 سال عمر داشته باشد"
      ],
      "correct_answer_fa": [
          "در صورت بریدگی در الیاف باربر بیش از 10 درصد عرض",
          "در صورت آسیب به درزها"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "2776",
      "question_text": "Sie wollen in Ihrem PKW einen Hund befördern. Was sollten Sie dabei beachten?",
      "answers": [
          "Hunde sollten immer am Beifahrersitz sitzend befördert werden",
          "Kleine Hunde mit geringem Gewicht sollten mit einem Hundegurt gesichert und auf der Rückbank befördert werden",
          "Mittelgroße Hunde sollten in einem Transportkäfig im Kofferraum befördert werden",
          "Große Hunde sollten im Kofferraum befördert werden. Dabei ist ein durchgehendes Trenngitter zu montieren"
      ],
      "correct_answers": [
          "Kleine Hunde mit geringem Gewicht sollten mit einem Hundegurt gesichert und auf der Rückbank befördert werden",
          "Mittelgroße Hunde sollten in einem Transportkäfig im Kofferraum befördert werden",
          "Große Hunde sollten im Kofferraum befördert werden. Dabei ist ein durchgehendes Trenngitter zu montieren"
      ],
      "question_text_fa": "شما می‌خواهید در خودروی خود یک سگ حمل کنید. به چه نکاتی باید توجه کنید؟",
      "answers_fa": [
          "سگ‌ها همیشه باید در صندلی جلو نشسته حمل شوند",
          "سگ‌های کوچک با وزن کم باید با یک بند مخصوص سگ ایمن شده و در صندلی عقب حمل شوند",
          "سگ‌های متوسط باید در یک قفس حمل در صندوق عقب حمل شوند",
          "سگ‌های بزرگ باید در صندوق عقب حمل شوند. در این صورت باید یک مش جداکننده نصب شود"
      ],
      "correct_answer_fa": [
          "سگ‌های کوچک با وزن کم باید با یک بند مخصوص سگ ایمن شده و در صندلی عقب حمل شوند",
          "سگ‌های متوسط باید در یک قفس حمل در صندوق عقب حمل شوند",
          "سگ‌های بزرگ باید در صندوق عقب حمل شوند. در این صورت باید یک مش جداکننده نصب شود"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2777",
      "question_text": "Sie wollen in Ihrem PKW einen Hund befördern. Was beachten Sie, wenn Sie im Kofferraum eine Transportbox verwenden?",
      "answers": [
          "Dass sie gegen Verrutschen gesichert ist",
          "Dass der Kofferraumdeckel während der Fahrt geöffnet bleibt",
          "Dass sie gegen Umkippen gesichert ist",
          "Dass für den Hund in der Transportbox ein offener Wassernapf vorhanden ist"
      ],
      "correct_answers": [
          "Dass sie gegen Verrutschen gesichert ist",
          "Dass sie gegen Umkippen gesichert ist"
      ],
      "question_text_fa": "شما می‌خواهید در خودروی خود یک سگ حمل کنید. چه نکاتی را باید در هنگام استفاده از یک جعبه حمل در صندوق عقب رعایت کنید؟",
      "answers_fa": [
          "که جعبه در برابر سرخوردن ایمن باشد",
          "که درب صندوق عقب در حین حرکت باز بماند",
          "که جعبه در برابر کج شدن ایمن باشد",
          "که برای سگ در جعبه حمل یک کاسه آب باز موجود باشد"
      ],
      "correct_answer_fa": [
          "که جعبه در برابر سرخوردن ایمن باشد",
          "که جعبه در برابر کج شدن ایمن باشد"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "42",
      "question_text": "Sie fahren mit Ihrem PKW auf einer Autobahn. Im Verkehrsfunk hören Sie, dass auf dem Teilstück vor Ihnen ein LKW bei einem Tunnel die Höhenkontrolle ausgelöst hat. Was schließen Sie daraus?",
      "answers": [
          "Dass der Tunnel nur kurze Zeit gesperrt ist",
          "Dass der Tunnel für einige Stunden gesperrt ist",
          "Dass der Tunnel im Schritttempo befahrbar ist",
          "Dass der Tunnel jederzeit normal befahrbar ist"
      ],
      "correct_answers": [
          "Dass der Tunnel nur kurze Zeit gesperrt ist"
      ],
      "question_text_fa": "شما با خودروی خود در یک بزرگراه در حال حرکت هستید. در اخبار ترافیکی می‌شنوید که در قسمت جلو یک کامیون در یک تونل کنترل ارتفاع را فعال کرده است. از این چه نتیجه‌گیری می‌کنید؟",
      "answers_fa": [
          "که تونل فقط برای مدت کوتاهی بسته است",
          "که تونل برای چند ساعت بسته است",
          "که تونل با سرعت پیاده‌روی قابل عبور است",
          "که تونل در هر زمان قابل عبور عادی است"
      ],
      "correct_answer_fa": [
          "که تونل فقط برای مدت کوتاهی بسته است"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "43",
      "question_text": "Sie fahren mit Ihrem PKW auf einer Autobahn. Im Verkehrsfunk hören Sie, dass auf dem Teilstück vor Ihnen ein LKW bei einem Tunnel die Höhenkontrolle ausgelöst hat. Wie verhalten Sie sich?",
      "answers": [
          "Ich rechne mit einem Stau vor dem Tunnel",
          "Ich werde eine Rettungsgasse bilden, wenn ich zum Stau vor dem Tunnel komme",
          "Ich warte die kurze Sperre vor dem Tunnel ab",
          "Ich muss die Autobahn auf jeden Fall bei der nächsten Ausfahrt verlassen und eine Umleitung benutzen"
      ],
      "correct_answers": [
          "Ich rechne mit einem Stau vor dem Tunnel",
          "Ich werde eine Rettungsgasse bilden, wenn ich zum Stau vor dem Tunnel komme",
          "Ich warte die kurze Sperre vor dem Tunnel ab"
      ],
      "question_text_fa": "شما با خودروی خود در یک بزرگراه در حال حرکت هستید. در اخبار ترافیکی می‌شنوید که در قسمت جلو یک کامیون در یک تونل کنترل ارتفاع را فعال کرده است. چه رفتاری از خود نشان می‌دهید؟",
      "answers_fa": [
          "من انتظار ترافیک در مقابل تونل را دارم",
          "اگر به ترافیک در مقابل تونل برسم، یک مسیر نجات ایجاد می‌کنم",
          "منتظر می‌مانم تا بسته شدن کوتاه در مقابل تونل تمام شود",
          "در هر حال باید بزرگراه را در اولین خروجی ترک کرده و از یک مسیر دور استفاده کنم"
      ],
      "correct_answer_fa": [
          "من انتظار ترافیک در مقابل تونل را دارم",
          "اگر به ترافیک در مقابل تونل برسم، یک مسیر نجات ایجاد می‌کنم",
          "منتظر می‌مانم تا بسته شدن کوتاه در مقابل تونل تمام شود"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "74",
      "question_text": "Der Antriebsmotor Ihres Fahrzeuges blockiert während der Fahrt. Welche Folgen kann das haben?",
      "answers": [
          "Die Bremsen funktionieren nicht mehr",
          "Die Antriebsräder blockieren. Dadurch kann das Fahrzeug ins Schieben oder Schleudern kommen",
          "Die Lenkung kann blockiert werden",
          "Die Sicherheitsgurte versagen"
      ],
      "correct_answers": [
          "Die Antriebsräder blockieren. Dadurch kann das Fahrzeug ins Schieben oder Schleudern kommen"
      ],
      "question_text_fa": "موتور خودرو شما در حین حرکت قفل می‌کند. این می‌تواند چه عواقبی داشته باشد؟",
      "answers_fa": [
          "ترمزها دیگر کار نمی‌کنند",
          "چرخ‌های محرک قفل می‌شوند. این ممکن است منجر به کشیده شدن یا چرخش خودرو شود",
          "ممکن است فرمان قفل شود",
          "کمربندهای ایمنی از کار می‌افتند"
      ],
      "correct_answer_fa": [
          "چرخ‌های محرک قفل می‌شوند. این ممکن است منجر به کشیده شدن یا چرخش خودرو شود"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "75",
      "question_text": "Welche Ursache(n) kann das Blockieren des Fahrzeugmotors haben?",
      "answers": [
          "Mängel bei der Motorschmierung",
          "Überhitzung der Fahrzeugbremsen",
          "Mängel bei der Motorkühlung",
          "Mängel bei der Treibstoffversorgung des Motors"
      ],
      "correct_answers": [
          "Mängel bei der Motorschmierung",
          "Mängel bei der Motorkühlung"
      ],
      "question_text_fa": "چه علتی می‌تواند موجب قفل شدن موتور خودرو شود؟",
      "answers_fa": [
          "کمبود در روغن‌کاری موتور",
          "گرم شدن بیش از حد ترمزهای خودرو",
          "کمبود در خنک‌کاری موتور",
          "کمبود در تأمین سوخت موتور"
      ],
      "correct_answer_fa": [
          "کمبود در روغن‌کاری موتور",
          "کمبود در خنک‌کاری موتور"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "76",
      "question_text": "Ihr PKW hat einen Dieselmotor. Sie wollen bei eisigen Temperaturen starten. Diese Kontrollleuchte leuchtet auf. Was bedeutet das?",
      "answers": [
          "Dass das Motoröl zu kalt ist",
          "Dass die Kühlflüssigkeit zu kalt ist",
          "Dass die Starthilfe für den Motor arbeitet",
          "Dass die Batterie aufgeheizt werden muss"
      ],
      "correct_answers": [
          "Dass die Starthilfe für den Motor arbeitet"
      ],
      "question_text_fa": "خودروی شما دارای موتور دیزل است. شما می‌خواهید در دماهای یخی استارت بزنید. این چراغ کنترل روشن می‌شود. این چه معنایی دارد؟",
      "answers_fa": [
          "که روغن موتور خیلی سرد است",
          "که مایع خنک‌کننده خیلی سرد است",
          "که کمک استارت برای موتور کار می‌کند",
          "که باتری باید گرم شود"
      ],
      "correct_answer_fa": [
          "که کمک استارت برای موتور کار می‌کند"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "83",
      "question_text": "Ihr PKW hat einen Dieselmotor. Sie wollen bei eisigen Temperaturen starten. Diese Kontrollleuchte leuchtet auf. Wie verhalten Sie sich?",
      "answers": [
          "Ich warte ab, bis diese Kontrollleuchte erlischt, und starte erst dann",
          "Ich heize die Batterie auf",
          "Ich schalte beim Startvorgang alle Stromverbraucher ab, die nicht unbedingt notwendig sind",
          "Ich heize die Kühlflüssigkeit auf"
      ],
      "correct_answers": [
          "Ich warte ab, bis diese Kontrollleuchte erlischt, und starte erst dann",
          "Ich schalte beim Startvorgang alle Stromverbraucher ab, die nicht unbedingt notwendig sind"
      ],
      "question_text_fa": "خودروی شما دارای موتور دیزل است. شما می‌خواهید در دماهای یخی استارت بزنید. این چراغ کنترل روشن می‌شود. چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "منتظر می‌مانم تا این چراغ کنترل خاموش شود و سپس استارت می‌زنم",
          "باتری را گرم می‌کنم",
          "در هنگام استارت همه مصرف‌کننده‌های برق که ضروری نیستند را خاموش می‌کنم",
          "مایع خنک‌کننده را گرم می‌کنم"
      ],
      "correct_answer_fa": [
          "منتظر می‌مانم تا این چراغ کنترل خاموش شود و سپس استارت می‌زنم",
          "در هنگام استارت همه مصرف‌کننده‌های برق که ضروری نیستند را خاموش می‌کنم"
      ],
      "category": "B - Personenbeförderung, Ladung, Anhänger"
  },
  {
      "question_number": "638",
      "question_text": "Sie fahren mit Ihrem PKW. Diese Kontrollleuchte leuchtet auf. Was bedeutet das?",
      "answers": [
          "Dass beim Fahrzeugmotor eine Störung aufgetreten ist",
          "Dass die Motorhaube nicht geschlossen ist",
          "Dass die Klimaanlage eingeschaltet ist",
          "Dass zu wenig Bremsflüssigkeit vorhanden ist"
      ],
      "correct_answers": [
          "Dass beim Fahrzeugmotor eine Störung aufgetreten ist"
      ],
      "question_text_fa": "شما با خودروی خود در حال حرکت هستید. این چراغ کنترل روشن می‌شود. این چه معنایی دارد؟",
      "answers_fa": [
          "که در موتور خودرو اختلالی به وجود آمده است",
          "که درب موتور بسته نیست",
          "که سیستم تهویه مطبوع روشن است",
          "که مایع ترمز به حد کافی موجود نیست"
      ],
      "correct_answer_fa": [
          "که در موتور خودرو اختلالی به وجود آمده است"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "639",
      "question_text": "Sie fahren mit Ihrem PKW. Diese Kontrollleuchte leuchtet auf. Wie verhalten Sie sich?",
      "answers": [
          "Ich rechne damit, dass der Motor nicht die gewohnte Leistung abgibt",
          "Ich rechne damit, dass die Kühlflüssigkeit zu heiß wird",
          "Ich halte an und folge genau den Anweisungen in der Betriebsanleitung des PKW",
          "Ich halte an und lasse den Motor mit geöffneter Motorhaube auskühlen"
      ],
      "correct_answers": [
          "Ich rechne damit, dass der Motor nicht die gewohnte Leistung abgibt",
          "Ich halte an und folge genau den Anweisungen in der Betriebsanleitung des PKW"
      ],
      "question_text_fa": "شما با خودروی خود در حال حرکت هستید. این چراغ کنترل روشن می‌شود. چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "انتظار دارم که موتور عملکرد عادی خود را نداشته باشد",
          "انتظار دارم که مایع خنک‌کننده بیش از حد داغ شود",
          "متوقف می‌شوم و به دقت دستورالعمل‌های دفترچه راهنمای خودرو را دنبال می‌کنم",
          "متوقف می‌شوم و اجازه می‌دهم موتور با درب موتور باز خنک شود"
      ],
      "correct_answer_fa": [
          "انتظار دارم که موتور عملکرد عادی خود را نداشته باشد",
          "متوقف می‌شوم و به دقت دستورالعمل‌های دفترچه راهنمای خودرو را دنبال می‌کنم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "659",
      "question_text": "Sie überprüfen die Profiltiefe der Reifen Ihres PKW. Wie groß ist die gesetzliche Mindestprofiltiefe?",
      "answers": [
          "1 mm",
          "4 mm",
          "2 mm",
          "1,6 mm"
      ],
      "correct_answers": [
          "1,6 mm"
      ],
      "question_text_fa": "شما عمق آج تایرهای خودروی خود را بررسی می‌کنید. حداقل عمق آج قانونی چقدر است؟",
      "answers_fa": [
          "1 میلی‌متر",
          "4 میلی‌متر",
          "2 میلی‌متر",
          "1.6 میلی‌متر"
      ],
      "correct_answer_fa": [
          "1.6 میلی‌متر"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "660",
      "question_text": "Sie überprüfen die Profiltiefe der Winterreifen Ihres PKW. Wie groß muss die Profiltiefe dieser Reifen mindestens sein, damit sie als Winterreifen gelten?",
      "answers": [
          "2 mm",
          "3 mm",
          "4 mm",
          "8 mm"
      ],
      "correct_answers": [
          "4 mm"
      ],
      "question_text_fa": "شما عمق آج لاستیک‌های زمستانی خودروی خود را بررسی می‌کنید. عمق آج این لاستیک‌ها حداقل چقدر باید باشد تا به عنوان لاستیک زمستانی معتبر باشند؟",
      "answers_fa": [
          "2 میلی‌متر",
          "3 میلی‌متر",
          "4 میلی‌متر",
          "8 میلی‌متر"
      ],
      "correct_answers_fa": [
          "4 میلی‌متر"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  }
  ,
  {
      "question_number": "777",
      "question_text": "Sie fahren mit einem PKW. Was bedeutet es, wenn diese Kontrollleuchte aufleuchtet?",
      "answers": [
          "Dass der Motorölstand zu gering ist",
          "Dass der Stand der Kühlflüssigkeit zu gering ist",
          "Dass der Wasservorrat für die Scheibenwaschanlage zu gering ist",
          "Dass der Öldruck im Motor zu gering ist"
      ],
      "correct_answers": [
          "Dass der Motorölstand zu gering ist"
      ],
      "question_text_fa": "شما با یک خودروی سواری در حال حرکت هستید. چه معنایی دارد اگر این چراغ کنترل روشن شود؟",
      "answers_fa": [
          "که سطح روغن موتور پایین است",
          "که سطح مایع خنک‌کننده پایین است",
          "که سطح آب برای شستشوی شیشه‌ها پایین است",
          "که فشار روغن در موتور پایین است"
      ],
      "correct_answer_fa": [
          "که سطح روغن موتور پایین است"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "779",
      "question_text": "Sie fahren mit einem PKW. Wie verhalten Sie sich, wenn diese Kontrollleuchte aufleuchtet?",
      "answers": [
          "Ich lasse das Motoröl wechseln",
          "Ich sorge dafür, dass Motoröl nachgefüllt wird",
          "Ich sorge dafür, dass der Vorratsbehälter für die Scheibenwaschanlage nachgefüllt wird",
          "Ich lasse den PKW abschleppen"
      ],
      "correct_answers": [
          "Ich sorge dafür, dass Motoröl nachgefüllt wird"
      ],
      "question_text_fa": "شما با یک خودروی سواری در حال حرکت هستید. چگونه رفتار می‌کنید اگر این چراغ کنترل روشن شود؟",
      "answers_fa": [
          "روغن موتور را عوض می‌کنم",
          "اطمینان حاصل می‌کنم که روغن موتور به حد کافی اضافه شود",
          "اطمینان حاصل می‌کنم که مخزن آب شستشوی شیشه‌ها پر شود",
          "خودرو را می‌گذارم تا به یدک کشیده شود"
      ],
      "correct_answer_fa": [
          "اطمینان حاصل می‌کنم که روغن موتور به حد کافی اضافه شود"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1494",
      "question_text": "Ihr PKW hat eine mit dem Fuß zu betätigende Kupplung. Der Fahrzeugmotor lässt sich nicht starten, weil die Batterie entladen ist. Wie können Sie den Motor trotzdem starten?",
      "answers": [
          "Durch Anschieben oder Anschleppen",
          "Mit einem Hilfsmotor",
          "Mit Hilfe eines anderen Fahrzeuges unter Verwendung von Starterkabeln",
          "Durch Anrollen lassen, wenn der PKW in einem Gefälle steht"
      ],
      "correct_answers": [
          "Durch Anschieben oder Anschleppen",
          "Mit Hilfe eines anderen Fahrzeuges unter Verwendung von Starterkabeln",
          "Durch Anrollen lassen, wenn der PKW in einem Gefälle steht"
      ],
      "question_text_fa": "خودروی شما دارای کلاچ پایدار است. موتور خودرو به دلیل تخلیه باتری روشن نمی‌شود. چگونه می‌توانید با این حال موتور را استارت بزنید؟",
      "answers_fa": [
          "با هل دادن یا یدک کشیدن",
          "با یک موتور کمکی",
          "با کمک یک خودروی دیگر و استفاده از کابل‌های استارت",
          "با اجازه دادن به خودرو برای حرکت در سراشیبی"
      ],
      "correct_answer_fa": [
          "با هل دادن یا یدک کشیدن",
          "با کمک یک خودروی دیگر و استفاده از کابل‌های استارت",
          "با اجازه دادن به خودرو برای حرکت در سراشیبی"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1495",
      "question_text": "Wodurch kann sich die Batterie Ihres PKW unabsichtlich entladen?",
      "answers": [
          "Wenn ich nach dem Abstellen des PKW vergessen habe, Stromverbraucher abzuschalten",
          "Wenn die Batterie defekt geworden ist",
          "Wenn der PKW eine Störung im elektrischen System hat",
          "Wenn der Fahrzeugmotor längere Zeit niedertourig läuft"
      ],
      "correct_answers": [
          "Wenn ich nach dem Abstellen des PKW vergessen habe, Stromverbraucher abzuschalten",
          "Wenn die Batterie defekt geworden ist",
          "Wenn der PKW eine Störung im elektrischen System hat"
      ],
      "question_text_fa": "باتری خودروی شما چگونه می‌تواند به طور ناخواسته تخلیه شود؟",
      "answers_fa": [
          "اگر بعد از خاموش کردن خودرو فراموش کنم که مصرف‌کننده‌های برق را خاموش کنم",
          "اگر باتری خراب شده باشد",
          "اگر خودرو دچار اختلال در سیستم الکتریکی باشد",
          "اگر موتور خودرو برای مدت طولانی با دور کم کار کند"
      ],
      "correct_answer_fa": [
          "اگر بعد از خاموش کردن خودرو فراموش کنم که مصرف‌کننده‌های برق را خاموش کنم",
          "اگر باتری خراب شده باشد",
          "اگر خودرو دچار اختلال در سیستم الکتریکی باشد"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1499",
      "question_text": "Sie fahren einen PKW mit Benzin- oder Dieselmotor. Welche Wartungsarbeiten sollten Sie am Fahrzeug in Fachwerkstätten regelmäßig durchführen lassen?",
      "answers": [
          "Das Service nach den Angaben des Fahrzeugherstellers",
          "Die Wagenwäsche",
          "Den Wechsel des Motoröls",
          "Die Kontrolle der Frostsicherheit der Kühlflüssigkeit"
      ],
      "correct_answers": [
          "Das Service nach den Angaben des Fahrzeugherstellers",
          "Den Wechsel des Motoröls",
          "Die Kontrolle der Frostsicherheit der Kühlflüssigkeit"
      ],
      "question_text_fa": "شما با خودرویی با موتور بنزینی یا دیزلی در حال حرکت هستید. چه کارهای نگهداری را باید به طور منظم در کارگاه‌های تخصصی انجام دهید؟",
      "answers_fa": [
          "خدمات مطابق با اطلاعات تولیدکننده خودرو",
          "شستشوی خودرو",
          "تعویض روغن موتور",
          "کنترل ایمنی یخ مایع خنک‌کننده"
      ],
      "correct_answer_fa": [
          "خدمات مطابق با اطلاعات تولیدکننده خودرو",
          "تعویض روغن موتور",
          "کنترل ایمنی یخ مایع خنک‌کننده"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1500",
      "question_text": "Sie fahren einen PKW mit Benzin- oder Dieselmotor. Warum müssen Sie das Motoröl regelmäßig wechseln lassen?",
      "answers": [
          "Weil sonst der Motor zu rosten beginnt",
          "Weil sonst das Motoröl seine Schmierfähigkeit verliert",
          "Weil sonst die Öldruckkontrollleuchte aufleuchtet",
          "Weil sonst mit stark erhöhtem Treibstoffverbrauch zu rechnen ist"
      ],
      "correct_answers": [
          "Weil sonst das Motoröl seine Schmierfähigkeit verliert"
      ],
      "question_text_fa": "شما با خودرویی با موتور بنزینی یا دیزلی در حال حرکت هستید. چرا باید روغن موتور را به طور منظم تعویض کنید؟",
      "answers_fa": [
          "زیرا در غیر این صورت موتور زنگ می‌زند",
          "زیرا در غیر این صورت روغن موتور خاصیت روانکاری خود را از دست می‌دهد",
          "زیرا در غیر این صورت چراغ کنترل فشار روغن روشن می‌شود",
          "زیرا در غیر این صورت باید انتظار مصرف سوخت بسیار زیاد را داشت"
      ],
      "correct_answer_fa": [
          "زیرا در غیر این صورت روغن موتور خاصیت روانکاری خود را از دست می‌دهد"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1501",
      "question_text": "Was sollten Sie bei den Reifen Ihres Fahrzeuges regelmäßig überprüfen?",
      "answers": [
          "Den Reifendruck",
          "Das Baujahr",
          "Die Profiltiefe",
          "Ob Beschädigungen sichtbar sind"
      ],
      "correct_answers": [
          "Den Reifendruck",
          "Die Profiltiefe",
          "Ob Beschädigungen sichtbar sind"
      ],
      "question_text_fa": "شما باید چه چیزهایی را در مورد لاستیک‌های خودروی خود به طور منظم بررسی کنید؟",
      "answers_fa": [
          "فشار لاستیک",
          "سال ساخت",
          "عمق آج",
          "آیا آسیب‌های قابل مشاهده وجود دارد"
      ],
      "correct_answer_fa": [
          "فشار لاستیک",
          "عمق آج",
          "آیا آسیب‌های قابل مشاهده وجود دارد"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1502",
      "question_text": "Wozu dienen die Indikatoren, die im Profil der Fahrzeugreifen angebracht sind?",
      "answers": [
          "Zur Anzeige des Reifendrucks",
          "Zur Anzeige der Mindestprofiltiefe",
          "Zur Anzeige der Reifentemperatur",
          "Zur Anzeige des Alters des Reifens"
      ],
      "correct_answers": [
          "Zur Anzeige der Mindestprofiltiefe"
      ],
      "question_text_fa": "نشانگرهایی که در آج لاستیک‌های خودرو نصب شده‌اند، به چه منظور هستند؟",
      "answers_fa": [
          "برای نمایش فشار لاستیک",
          "برای نمایش حداقل عمق آج",
          "برای نمایش دمای لاستیک",
          "برای نمایش سن لاستیک"
      ],
      "correct_answer_fa": [
          "برای نمایش حداقل عمق آج"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1504",
      "question_text": "Welche Reifenarten können Sie bei einem PKW montieren lassen?",
      "answers": [
          "Winterreifen",
          "Sommerreifen",
          "Halbjahresreifen",
          "Spikesreifen"
      ],
      "correct_answers": [
          "Winterreifen",
          "Sommerreifen",
          "Spikesreifen"
      ],
      "question_text_fa": "کدام نوع لاستیک‌ها را می‌توانید برای یک خودرو نصب کنید؟",
      "answers_fa": [
          "لاستیک‌های زمستانی",
          "لاستیک‌های تابستانی",
          "لاستیک‌های نیم‌ساله",
          "لاستیک‌های چنگال‌دار"
      ],
      "correct_answers_fa": [
          "لاستیک‌های زمستانی",
          "لاستیک‌های تابستانی",
          "لاستیک‌های چنگال‌دار"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  }
  ,
  {
      "question_number": "1505",
      "question_text": "Sie wollen auf Ihrem PKW neue Reifen montieren. Welche Reifenarten dürfen Sie verwenden?",
      "answers": [
          "Vier Sommerreifen",
          "Zwei Sommer- und zwei Spikesreifen",
          "Zwei Winter- und zwei Spikesreifen",
          "Vier Winterreifen"
      ],
      "correct_answers": [
          "Vier Sommerreifen",
          "Vier Winterreifen"
      ],
      "question_text_fa": "شما می‌خواهید لاستیک‌های جدیدی بر روی خودروی خود نصب کنید. چه نوع لاستیک‌هایی را می‌توانید استفاده کنید؟",
      "answers_fa": [
          "چهار لاستیک تابستانی",
          "دو لاستیک تابستانی و دو لاستیک اسپایک‌دار",
          "دو لاستیک زمستانی و دو لاستیک اسپایک‌دار",
          "چهار لاستیک زمستانی"
      ],
      "correct_answer_fa": [
          "چهار لاستیک تابستانی",
          "چهار لاستیک زمستانی"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1506",
      "question_text": "Woher wissen Sie, wie hoch der Reifendruck Ihres Fahrzeuges sein soll?",
      "answers": [
          "Das steht in der Zulassungsbescheinigung",
          "Das steht außen am Reifen angeschrieben",
          "Das steht an der Innenseite des Tankdeckels oder der Fahrertüre angeschrieben",
          "Das steht in der Betriebsanleitung des Fahrzeuges"
      ],
      "correct_answers": [
          "Das steht an der Innenseite des Tankdeckels oder der Fahrertüre angeschrieben",
          "Das steht in der Betriebsanleitung des Fahrzeuges"
      ],
      "question_text_fa": "چگونه می‌دانید که فشار لاستیک خودروی شما چقدر باید باشد؟",
      "answers_fa": [
          "این در گواهی ثبت خودرو نوشته شده است",
          "این در قسمت بیرونی لاستیک نوشته شده است",
          "این در قسمت داخلی درب باک یا درب راننده نوشته شده است",
          "این در دفترچه راهنمای خودرو نوشته شده است"
      ],
      "correct_answer_fa": [
          "این در قسمت داخلی درب باک یا درب راننده نوشته شده است",
          "این در دفترچه راهنمای خودرو نوشته شده است"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1507",
      "question_text": "Wann bzw. wo ist es sinnvoll, den Reifendruck des Fahrzeuges etwas höher als normal zu wählen?",
      "answers": [
          "Bei den Vorderrädern",
          "Wenn Winterreifen verwendet werden",
          "Wenn Sommerreifen verwendet werden",
          "Wenn das Fahrzeug stark beladen ist"
      ],
      "correct_answers": [
          "Wenn Winterreifen verwendet werden",
          "Wenn das Fahrzeug stark beladen ist"
      ],
      "question_text_fa": "چه زمانی یا کجا منطقی است که فشار لاستیک خودرو را کمی بالاتر از حد معمول تنظیم کنید؟",
      "answers_fa": [
          "در چرخ‌های جلو",
          "زمانی که لاستیک‌های زمستانی استفاده می‌شود",
          "زمانی که لاستیک‌های تابستانی استفاده می‌شود",
          "زمانی که خودرو به شدت بارگذاری شده است"
      ],
      "correct_answer_fa": [
          "زمانی که لاستیک‌های زمستانی استفاده می‌شود",
          "زمانی که خودرو به شدت بارگذاری شده است"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1508",
      "question_text": "Mit welchen Folgen müssen Sie rechnen, wenn der Reifendruck Ihres Fahrzeuges zu gering oder zu hoch ist?",
      "answers": [
          "Dass sich das Fahrverhalten verschlechtert",
          "Dass sich die Reifen schneller abnutzen",
          "Dass sich der Bremsweg verlängert",
          "Dass sich die Lebensdauer der Reifen verlängert"
      ],
      "correct_answers": [
          "Dass sich das Fahrverhalten verschlechtert",
          "Dass sich die Reifen schneller abnutzen",
          "Dass sich der Bremsweg verlängert"
      ],
      "question_text_fa": "اگر فشار لاستیک خودرو شما خیلی کم یا خیلی زیاد باشد، با چه عواقبی روبه‌رو می‌شوید؟",
      "answers_fa": [
          "اینکه رفتار خودرو بدتر می‌شود",
          "اینکه لاستیک‌ها سریع‌تر فرسوده می‌شوند",
          "اینکه فاصله ترمز افزایش می‌یابد",
          "اینکه عمر لاستیک‌ها افزایش می‌یابد"
      ],
      "correct_answer_fa": [
          "اینکه رفتار خودرو بدتر می‌شود",
          "اینکه لاستیک‌ها سریع‌تر فرسوده می‌شوند",
          "اینکه فاصله ترمز افزایش می‌یابد"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1511",
      "question_text": "Sie sind mit einem Vorderrad heftig gegen ein Hindernis gefahren. Was müssen Sie beim Fahrzeug überprüfen?",
      "answers": [
          "Ob die Reifen oder die Felgen beschädigt wurden",
          "Ob die Bremsen beschädigt wurden",
          "Ob die Stoßdämpfer beschädigt wurden",
          "Ob die Lenkung beschädigt wurde"
      ],
      "correct_answers": [
          "Ob die Reifen oder die Felgen beschädigt wurden",
          "Ob die Lenkung beschädigt wurde"
      ],
      "question_text_fa": "شما با یکی از چرخ‌های جلو به شدت به یک مانع برخورد کرده‌اید. چه چیزهایی را باید در خودرو بررسی کنید؟",
      "answers_fa": [
          "آیا لاستیک‌ها یا رینگ‌ها آسیب دیده‌اند",
          "آیا ترمزها آسیب دیده‌اند",
          "آیا کمک‌فنرها آسیب دیده‌اند",
          "آیا فرمان آسیب دیده است"
      ],
      "correct_answer_fa": [
          "آیا لاستیک‌ها یا رینگ‌ها آسیب دیده‌اند",
          "آیا فرمان آسیب دیده است"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1512",
      "question_text": "Sie sind mit einem Vorderrad heftig gegen ein Hindernis gefahren. Mit welchen Gefahren müssen Sie rechnen, wenn Sie mit beschädigtem Reifen weiterfahren?",
      "answers": [
          "Das Fahrzeug kann ins Schleudern kommen, wenn der Reifen Luft verliert",
          "Luft kann aus dem Reifen entweichen",
          "Der Motor des Fahrzeuges kann überhitzen",
          "Mit einem Reifenplatzer"
      ],
      "correct_answers": [
          "Das Fahrzeug kann ins Schleudern kommen, wenn der Reifen Luft verliert",
          "Luft kann aus dem Reifen entweichen",
          "Mit einem Reifenplatzer"
      ],
      "question_text_fa": "شما با یکی از چرخ‌های جلو به شدت به یک مانع برخورد کرده‌اید. با چه خطراتی روبه‌رو هستید اگر با لاستیک آسیب دیده ادامه دهید؟",
      "answers_fa": [
          "خودرو می‌تواند در صورت کاهش هوا در لاستیک به سمت چپ بچرخد",
          "هوا می‌تواند از لاستیک خارج شود",
          "موتور خودرو می‌تواند داغ شود",
          "با ترکیدن لاستیک مواجه می‌شوید"
      ],
      "correct_answer_fa": [
          "خودرو می‌تواند در صورت کاهش هوا در لاستیک به سمت چپ بچرخد",
          "هوا می‌تواند از لاستیک خارج شود",
          "با ترکیدن لاستیک مواجه می‌شوید"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1513",
      "question_text": "Was sollten Sie an den Beleuchtungseinrichtungen Ihres PKW kontrollieren?",
      "answers": [
          "Ob sie funktionieren",
          "Ob sie verschmutzt sind",
          "Ob sie die richtige Temperatur erreichen",
          "Ob sie sichtbare Schäden haben"
      ],
      "correct_answers": [
          "Ob sie funktionieren",
          "Ob sie verschmutzt sind",
          "Ob sie sichtbare Schäden haben"
      ],
      "question_text_fa": "شما باید چه چیزهایی را در مورد تجهیزات روشنایی خودروی خود بررسی کنید؟",
      "answers_fa": [
          "آیا آنها کار می‌کنند",
          "آیا آنها کثیف هستند",
          "آیا دمای مناسب را به دست می‌آورند",
          "آیا آسیب‌های قابل مشاهده دارند"
      ],
      "correct_answer_fa": [
          "آیا آنها کار می‌کنند",
          "آیا آنها کثیف هستند",
          "آیا آسیب‌های قابل مشاهده دارند"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1514",
      "question_text": "Bei Ihrem PKW ist die Lampe eines Blinkers defekt. Was tun Sie?",
      "answers": [
          "Ich fahre bis zum nächsten Servicetermin weiter",
          "Ich werde die defekte Birne bei der nächsten Tankstelle oder Fachwerkstätte tauschen lassen",
          "Ich fahre so lange nur geradeaus weiter, bis der Blinker repariert ist",
          "Ich gebe anstelle des Blinkens Handzeichen"
      ],
      "correct_answers": [
          "Ich werde die defekte Birne bei der nächsten Tankstelle oder Fachwerkstätte tauschen lassen",
          "Ich gebe anstelle des Blinkens Handzeichen"
      ],
      "question_text_fa": "در خودروی شما لامپ یکی از راهنماها خراب است. شما چه کار می‌کنید؟",
      "answers_fa": [
          "من تا موعد سرویس بعدی ادامه می‌دهم",
          "من لامپ خراب را در اولین جایگاه بنزین یا تعمیرگاه تخصصی تعویض می‌کنم",
          "من فقط به صورت مستقیم حرکت می‌کنم تا زمانی که راهنما تعمیر شود",
          "من به جای چشمک زدن علامت دست می‌زنم"
      ],
      "correct_answer_fa": [
          "من لامپ خراب را در اولین جایگاه بنزین یا تعمیرگاه تخصصی تعویض می‌کنم",
          "من به جای چشمک زدن علامت دست می‌زنم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1517",
      "question_text": "Die Stoßdämpfer Ihres Fahrzeuges sind abgenutzt. Mit welchen Auswirkungen auf das Fahrverhalten müssen Sie rechnen?",
      "answers": [
          "Der Bremsweg wird länger",
          "Das Fahrzeug kann bei Ausweichmanövern leicht ins Schleudern kommen",
          "Der Bremsweg wird kürzer",
          "Das Fahrzeug verliert auf unebener Fahrbahn leicht die Bodenhaftung"
      ],
      "correct_answers": [
          "Der Bremsweg wird länger",
          "Das Fahrzeug kann bei Ausweichmanövern leicht ins Schleudern kommen",
          "Das Fahrzeug verliert auf unebener Fahrbahn leicht die Bodenhaftung"
      ],
      "question_text_fa": "کمک‌فنرهای خودروی شما فرسوده شده‌اند. با چه تأثیراتی بر رفتار رانندگی باید حساب کنید؟",
      "answers_fa": [
          "فاصله ترمز طولانی‌تر می‌شود",
          "خودرو در هنگام تغییر مسیر می‌تواند به راحتی سر بخورد",
          "فاصله ترمز کوتاه‌تر می‌شود",
          "خودرو در جاده ناهموار به راحتی چسبندگی خود را از دست می‌دهد"
      ],
      "correct_answer_fa": [
          "فاصله ترمز طولانی‌تر می‌شود",
          "خودرو در هنگام تغییر مسیر می‌تواند به راحتی سر بخورد",
          "خودرو در جاده ناهموار به راحتی چسبندگی خود را از دست می‌دهد"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1518",
      "question_text": "Wie können Sie feststellen lassen, ob die Stoßdämpfer Ihres Fahrzeuges abgenutzt sind?",
      "answers": [
          "Auf einem Prüfstand in einer Fachwerkstatt",
          "Indem ich eine Fahrbremsprobe durchführe",
          "Indem ich eine Standbremsprobe durchführe",
          "Indem ich eine Lenkungskontrolle durchführe"
      ],
      "correct_answers": [
          "Auf einem Prüfstand in einer Fachwerkstatt"
      ],
      "question_text_fa": "چگونه می‌توانید متوجه شوید که آیا کمک‌فنرهای خودروی شما فرسوده شده‌اند؟",
      "answers_fa": [
          "در یک ایستگاه آزمایش در یک تعمیرگاه تخصصی",
          "با انجام آزمایش ترمز در حرکت",
          "با انجام آزمایش ترمز در حالت ایستاده",
          "با انجام بررسی فرمان"
      ],
      "correct_answer_fa": [
          "در یک ایستگاه آزمایش در یک تعمیرگاه تخصصی"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1527",
      "question_text": "Während der Fahrt leuchtet diese Kontrollleuchte auf. Was schließen Sie daraus?",
      "answers": [
          "Dass die Batterie bereits leer geworden und keine elektrische Energie mehr vorhanden ist",
          "Dass die elektrische Energie nur mehr aus der Batterie entnommen wird",
          "Dass die Batterie nicht mehr aufgeladen wird",
          "Dass der Flüssigkeitsstand in der Batterie zu weit abgesunken ist"
      ],
      "correct_answers": [
          "Dass die elektrische Energie nur mehr aus der Batterie entnommen wird",
          "Dass die Batterie nicht mehr aufgeladen wird"
      ],
      "question_text_fa": "در حین رانندگی این چراغ کنترل روشن می‌شود. چه نتیجه‌ای می‌گیرید؟",
      "answers_fa": [
          "ممکن است باتری تمام شده باشد و انرژی الکتریکی دیگری در دسترس نباشد",
          "ممکن است انرژی الکتریکی فقط از باتری گرفته شود",
          "ممکن است باتری دیگر شارژ نشود",
          "ممکن است سطح مایع باتری بیش از حد کاهش یافته باشد"
      ],
      "correct_answers_fa": [
          "ممکن است انرژی الکتریکی فقط از باتری گرفته شود",
          "ممکن است باتری دیگر شارژ نشود"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  }
  ,
  {
      "question_number": "1528",
      "question_text": "Sie fahren mit Ihrem PKW. Diese Kontrollleuchte leuchtet auf. Wie verhalten Sie sich?",
      "answers": [
          "Ich halte an einer sicheren Stelle an und lese in der Betriebsanleitung des PKW nach, was zu tun ist",
          "Ich halte sofort an und überprüfe, ob die Lichtmaschine läuft",
          "Ich halte an einer sicheren Stelle an und überprüfe, ob genügend Kühlflüssigkeit vorhanden ist",
          "Ich halte sofort an und überprüfe, ob in der Batterie genügend Flüssigkeit vorhanden ist"
      ],
      "correct_answers": [
          "Ich halte an einer sicheren Stelle an und lese in der Betriebsanleitung des PKW nach, was zu tun ist"
      ],
      "question_text_fa": "شما با خودروی خود در حال رانندگی هستید. این چراغ کنترل روشن می‌شود. شما چگونه عمل می‌کنید؟",
      "answers_fa": [
          "من در یک مکان امن توقف می‌کنم و در دفترچه راهنمای خودرو می‌خوانم که چه کاری باید انجام دهم",
          "من فوراً توقف می‌کنم و بررسی می‌کنم که آیا دینام کار می‌کند",
          "من در یک مکان امن توقف می‌کنم و بررسی می‌کنم که آیا مایع خنک‌کننده کافی وجود دارد",
          "من فوراً توقف می‌کنم و بررسی می‌کنم که آیا در باتری مایع کافی وجود دارد"
      ],
      "correct_answer_fa": [
          "من در یک مکان امن توقف می‌کنم و در دفترچه راهنمای خودرو می‌خوانم که چه کاری باید انجام دهم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1529",
      "question_text": "Woran können Sie während der Fahrt erkennen, dass ein Blinker Ihres Fahrzeuges defekt geworden ist?",
      "answers": [
          "Daran, dass sich der Blinkerhebel nicht mehr betätigen lässt",
          "Daran, dass die Blinkerkontrollleuchte viel schneller oder viel langsamer als normal blinkt",
          "Das lässt sich während der Fahrt nicht erkennen",
          "Daran, dass das rote Blinkerwarnlicht aufleuchtet"
      ],
      "correct_answers": [
          "Daran, dass die Blinkerkontrollleuchte viel schneller oder viel langsamer als normal blinkt"
      ],
      "question_text_fa": "شما در حین رانندگی متوجه می‌شوید که یکی از راهنماهای خودروی شما خراب شده است. چگونه متوجه این موضوع می‌شوید؟",
      "answers_fa": [
          "از اینکه اهرم راهنما دیگر فعال نمی‌شود",
          "از اینکه چراغ کنترل راهنما خیلی سریع‌تر یا خیلی کندتر از حالت عادی چشمک می‌زند",
          "این موضوع در حین رانندگی قابل تشخیص نیست",
          "از اینکه چراغ هشدار راهنما روشن می‌شود"
      ],
      "correct_answer_fa": [
          "از اینکه چراغ کنترل راهنما خیلی سریع‌تر یا خیلی کندتر از حالت عادی چشمک می‌زند"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1530",
      "question_text": "Sie erkennen während der Fahrt , dass ein Blinker defekt geworden ist. Wie verhalten Sie sich?",
      "answers": [
          "Ich werde den Defekt so rasch wie möglich beheben lassen",
          "Bis der Blinker wieder funktioniert, muss ich bei Richtungsänderungen sichtbare Zeichen mit dem Arm geben",
          "Ich darf keine Richtungsänderungen mehr durchführen",
          "Ich darf nicht mehr weiterfahren und muss den Defekt sofort durch einen Pannendienst beheben lassen"
      ],
      "correct_answers": [
          "Ich werde den Defekt so rasch wie möglich beheben lassen",
          "Bis der Blinker wieder funktioniert, muss ich bei Richtungsänderungen sichtbare Zeichen mit dem Arm geben"
      ],
      "question_text_fa": "شما در حین رانندگی متوجه می‌شوید که یک راهنما خراب شده است. شما چگونه عمل می‌کنید؟",
      "answers_fa": [
          "من این خرابی را در اسرع وقت برطرف می‌کنم",
          "تا زمانی که راهنما دوباره کار کند، باید در هنگام تغییر مسیر علامت‌های واضحی با دست بدهم",
          "من دیگر اجازه تغییر مسیر ندارم",
          "من نمی‌توانم ادامه دهم و باید این خرابی را فوراً توسط یک سرویس امداد رفع کنم"
      ],
      "correct_answer_fa": [
          "من این خرابی را در اسرع وقت برطرف می‌کنم",
          "تا زمانی که راهنما دوباره کار کند، باید در هنگام تغییر مسیر علامت‌های واضحی با دست بدهم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1541",
      "question_text": "Ihr PKW hat einen Benzin- oder Dieselmotor. In welchen Fällen hat der Motor einen besonders hohen Kraftstoffverbrauch und damit Schadstoffausstoß?",
      "answers": [
          "Wenn der Motor kalt ist",
          "Wenn der Motor mit Vollgas betrieben wird",
          "Wenn die vom Fahrzeughersteller vorgeschriebenen Werkstatttermine nicht eingehalten werden",
          "Wenn der PKW nicht voll besetzt ist"
      ],
      "correct_answers": [
          "Wenn der Motor kalt ist",
          "Wenn der Motor mit Vollgas betrieben wird",
          "Wenn die vom Fahrzeughersteller vorgeschriebenen Werkstatttermine nicht eingehalten werden"
      ],
      "question_text_fa": "خودروی شما موتور بنزینی یا دیزلی دارد. در چه مواردی موتور مصرف سوخت بسیار بالایی دارد و به همین دلیل آلایندگی نیز زیاد است؟",
      "answers_fa": [
          "زمانی که موتور سرد است",
          "زمانی که موتور با حداکثر قدرت کار می‌کند",
          "زمانی که زمان‌های تعمیرگاه مشخص شده توسط سازنده خودرو رعایت نمی‌شوند",
          "زمانی که خودرو پر نشده است"
      ],
      "correct_answer_fa": [
          "زمانی که موتور سرد است",
          "زمانی که موتور با حداکثر قدرت کار می‌کند",
          "زمانی که زمان‌های تعمیرگاه مشخص شده توسط سازنده خودرو رعایت نمی‌شوند"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1542",
      "question_text": "Ihr PKW hat einen Benzin- oder Dieselmotor. Wie fahren Sie damit umweltfreundlich und sparsam?",
      "answers": [
          "Ich lasse nach einem Kaltstart den Motor erst längere Zeit am Stand warmlaufen, bevor ich wegfahre",
          "Ich fahre im höchstmöglichen Gang mit möglichst geringer Motordrehzahl",
          "Ich richte mich nach der Schaltanzeige am Armaturenbrett",
          "Ich versuche, die Geschwindigkeit möglichst gleichmäßig beizubehalten"
      ],
      "correct_answers": [
          "Ich fahre im höchstmöglichen Gang mit möglichst geringer Motordrehzahl",
          "Ich richte mich nach der Schaltanzeige am Armaturenbrett",
          "Ich versuche, die Geschwindigkeit möglichst gleichmäßig beizubehalten"
      ],
      "question_text_fa": "خودروی شما دارای موتور بنزینی یا دیزلی است. چگونه می‌توانید با آن به صورت محیط‌زیست‌پسند و به‌صرفه رانندگی کنید؟",
      "answers_fa": [
          "بعد از استارت سرد، موتور را برای مدت زمان طولانی در حالت ایستاده گرم نمی‌کنم و قبل از حرکت آن را روشن می‌گذارم",
          "در بالاترین دنده ممکن با کمترین دور موتور رانندگی می‌کنم",
          "به نشانگر دنده در صفحه کیلومترشمار توجه می‌کنم",
          "سعی می‌کنم سرعت را به صورت یکنواخت حفظ کنم"
      ],
      "correct_answers_fa": [
          "در بالاترین دنده ممکن با کمترین دور موتور رانندگی می‌کنم",
          "به نشانگر دنده در صفحه کیلومترشمار توجه می‌کنم",
          "سعی می‌کنم سرعت را به صورت یکنواخت حفظ کنم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  }
  ,
  {
      "question_number": "1543",
      "question_text": "Ihr PKW hat einen Benzin- oder Dieselmotor. Welche Gefahr besteht, wenn Sie den Motor in geschlossenen Räumen längere Zeit laufen lassen?",
      "answers": [
          "Erstickungsgefahr durch das Abgas des Verbrennungsmotors",
          "Explosionsgefahr durch Motorüberhitzung",
          "Gar keine, wenn das Fahrzeug mit Katalysator oder Rußpartikelfilter ausgerüstet ist",
          "Es besteht die Gefahr, dass die Auspuffanlage beschädigt wird"
      ],
      "correct_answers": [
          "Erstickungsgefahr durch das Abgas des Verbrennungsmotors"
      ],
      "question_text_fa": "خودروی شما موتور بنزینی یا دیزلی دارد. چه خطری وجود دارد اگر موتور را در فضاهای بسته برای مدت طولانی روشن بگذارید؟",
      "answers_fa": [
          "خطر خفگی ناشی از گازهای خروجی موتور احتراق",
          "خطر انفجار به دلیل گرم شدن بیش از حد موتور",
          "هیچ خطری ندارد اگر خودرو با کاتالیزور یا فیلتر ذرات کربن مجهز باشد",
          "خطر آسیب به سیستم اگزوز وجود دارد"
      ],
      "correct_answer_fa": [
          "خطر خفگی ناشی از گازهای خروجی موتور احتراق"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1544",
      "question_text": "Ihr PKW hat einen Dieselmotor mit Rußpartikelfilter. Was müssen Sie beachten, wenn Sie vorwiegend kurze Strecken fahren?",
      "answers": [
          "Ich muss sofort nach dem Starten des Motors mit Vollgas fahren",
          "Ich vermeide auf jeden Fall das Fahren mit Vollgas",
          "Ich muss von Zeit zu Zeit eine längere Fahrt unternehmen, um den Partikelfilter zu reinigen",
          "Ich muss von Zeit zu Zeit den Tank reinigen lassen"
      ],
      "correct_answers": [
          "Ich muss von Zeit zu Zeit eine längere Fahrt unternehmen, um den Partikelfilter zu reinigen"
      ],
      "question_text_fa": "خودروی شما دارای موتور دیزلی با فیلتر ذرات کربن است. چه نکاتی را باید در نظر بگیرید اگر عمدتاً مسیرهای کوتاه رانندگی می‌کنید؟",
      "answers_fa": [
          "من بلافاصله بعد از روشن کردن موتور با حداکثر قدرت رانندگی می‌کنم",
          "من قطعاً از رانندگی با حداکثر قدرت خودداری می‌کنم",
          "من باید از وقت به وقت یک سفر طولانی‌تری انجام دهم تا فیلتر ذرات پاک شود",
          "من باید از وقت به وقت مخزن را تمیز کنم"
      ],
      "correct_answer_fa": [
          "من باید از وقت به وقت یک سفر طولانی‌تری انجام دهم تا فیلتر ذرات پاک شود"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1605",
      "question_text": "Bei Dunkelheit fällt ein Abblendlicht Ihres PKW aus. Wie verhalten Sie sich?",
      "answers": [
          "Wenn das Begrenzungslicht noch leuchtet, fahre ich bis zur nächsten Möglichkeit, den Schaden zu beheben, weiter",
          "Bis zur Reparatur kann ich, falls vorhanden, das Nebellicht einschalten",
          "Ich fahre mit dem Tagfahrlicht weiter",
          "Ich darf auf keinen Fall weiterfahren"
      ],
      "correct_answers": [
          "Wenn das Begrenzungslicht noch leuchtet, fahre ich bis zur nächsten Möglichkeit, den Schaden zu beheben, weiter",
          "Bis zur Reparatur kann ich, falls vorhanden, das Nebellicht einschalten"
      ],
      "question_text_fa": "در تاریکی یکی از نورهای پایین خودروی شما خاموش می‌شود. شما چگونه عمل می‌کنید؟",
      "answers_fa": [
          "اگر نور محدود هنوز روشن باشد، تا اولین فرصت برای تعمیر ادامه می‌دهم",
          "تا زمان تعمیر می‌توانم در صورت موجود بودن، نور مه‌شکن را روشن کنم",
          "با نور روزانه ادامه می‌دهم",
          "به هیچ عنوان نباید ادامه دهم"
      ],
      "correct_answer_fa": [
          "اگر نور محدود هنوز روشن باشد، تا اولین فرصت برای تعمیر ادامه می‌دهم",
          "تا زمان تعمیر می‌توانم در صورت موجود بودن، نور مه‌شکن را روشن کنم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1606",
      "question_text": "Bei Dunkelheit fällt ein Abblendlicht Ihres PKW aus. Warum dürfen Sie weiterfahren, wenn das Begrenzungslicht noch leuchtet?",
      "answers": [
          "Weil andere Verkehrsteilnehmer noch immer erkennen können, wie breit mein Fahrzeug ist",
          "Weil andere Verkehrsteilnehmer noch immer erkennen können, dass ein mehrspuriges Kraftfahrzeug entgegen kommt",
          "Weil mein PKW noch immer für andere Verkehrsteilnehmer erkennbar wäre, wenn ich anhalte",
          "Weil sich das Abblendlicht in einer kurzen Abkühlphase selbst regeneriert"
      ],
      "correct_answers": [
          "Weil andere Verkehrsteilnehmer noch immer erkennen können, wie breit mein Fahrzeug ist",
          "Weil andere Verkehrsteilnehmer noch immer erkennen können, dass ein mehrspuriges Kraftfahrzeug entgegen kommt",
          "Weil mein PKW noch immer für andere Verkehrsteilnehmer erkennbar wäre, wenn ich anhalte"
      ],
      "question_text_fa": "در تاریکی یکی از نورهای پایین خودروی شما خاموش می‌شود. چرا می‌توانید ادامه دهید اگر نور محدود هنوز روشن است؟",
      "answers_fa": [
          "زیرا سایر شرکت‌کنندگان در ترافیک هنوز می‌توانند عرض خودرو من را تشخیص دهند",
          "زیرا سایر شرکت‌کنندگان در ترافیک هنوز می‌توانند تشخیص دهند که یک وسیله نقلیه چندخطی در حال آمدن است",
          "زیرا خودروی من هنوز برای سایر شرکت‌کنندگان در ترافیک قابل تشخیص خواهد بود اگر توقف کنم",
          "زیرا نور پایین در یک دوره کوتاه خنک‌کننده خود به خود بازسازی می‌شود"
      ],
      "correct_answer_fa": [
          "زیرا سایر شرکت‌کنندگان در ترافیک هنوز می‌توانند عرض خودرو من را تشخیص دهند",
          "زیرا سایر شرکت‌کنندگان در ترافیک هنوز می‌توانند تشخیص دهند که یک وسیله نقلیه چندخطی در حال آمدن است",
          "زیرا خودروی من هنوز برای سایر شرکت‌کنندگان در ترافیک قابل تشخیص خواهد بود اگر توقف کنم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1691",
      "question_text": "Sie fahren mit Ihrem PKW auf einer kurvenreichen Freilandstraße. Plötzlich leuchtet diese Kontrollleuchte auf. Wie verhalten Sie sich?",
      "answers": [
          "Ich kupple sofort aus und halte am rechten Fahrbahnrand an",
          "Nach dem Anhalten stelle ich den Motor ab und schalte die Alarmblinkanlage ein",
          "Ich sichere das Fahrzeug ab und verständige den Pannendienst",
          "Nach dem Anhalten überprüfe ich den Motorölstand. Wenn der Ölstand ausreicht, setze ich die Fahrt trotz weiter aufleuchtender Kontrollleuchte fort"
      ],
      "correct_answers": [
          "Ich kupple sofort aus und halte am rechten Fahrbahnrand an",
          "Nach dem Anhalten stelle ich den Motor ab und schalte die Alarmblinkanlage ein",
          "Ich sichere das Fahrzeug ab und verständige den Pannendienst"
      ],
      "question_text_fa": "شما با خودروی خود در یک جاده پیچ‌دار در حال رانندگی هستید. ناگهان این چراغ کنترل روشن می‌شود. شما چگونه عمل می‌کنید؟",
      "answers_fa": [
          "من بلافاصله کلاچ را می‌گیرم و در کنار راست جاده توقف می‌کنم",
          "بعد از توقف موتور را خاموش می‌کنم و چراغ هشدار را روشن می‌کنم",
          "من خودرو را ایمن می‌کنم و به خدمات امداد اطلاع می‌دهم",
          "بعد از توقف سطح روغن موتور را بررسی می‌کنم. اگر سطح روغن کافی باشد، با وجود روشن بودن چراغ کنترل ادامه می‌دهم"
      ],
      "correct_answer_fa": [
          "من بلافاصله کلاچ را می‌گیرم و در کنار راست جاده توقف می‌کنم",
          "بعد از توقف موتور را خاموش می‌کنم و چراغ هشدار را روشن می‌کنم",
          "من خودرو را ایمن می‌کنم و به خدمات امداد اطلاع می‌دهم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1692",
      "question_text": "Sie fahren mit Ihrem PKW auf einer kurvenreichen Freilandstraße. Plötzlich leuchtet diese Kontrollleuchte auf. Warum dürfen Sie nicht weiterfahren?",
      "answers": [
          "Weil dann ein Motorschaden entstehen könnte",
          "Weil durch den Motorschaden der PKW schieben oder schleudern könnte",
          "Weil dann das Motoröl verdunsten könnte",
          "Weil dann die Batterie entleert werden könnte"
      ],
      "correct_answers": [
          "Weil dann ein Motorschaden entstehen könnte",
          "Weil durch den Motorschaden der PKW schieben oder schleudern könnte"
      ],
      "question_text_fa": "شما با خودروی خود در یک جاده پیچ‌دار در حال رانندگی هستید. ناگهان این چراغ کنترل روشن می‌شود. چرا نباید ادامه دهید؟",
      "answers_fa": [
          "زیرا ممکن است آسیب به موتور ایجاد شود",
          "زیرا ممکن است به دلیل آسیب به موتور، خودرو به جلو یا عقب برود یا سر بخورد",
          "زیرا ممکن است روغن موتور تبخیر شود",
          "زیرا ممکن است باتری خالی شود"
      ],
      "correct_answer_fa": [
          "زیرا ممکن است آسیب به موتور ایجاد شود",
          "زیرا ممکن است به دلیل آسیب به موتور، خودرو به جلو یا عقب برود یا سر بخورد"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1702",
      "question_text": "Wie sollten Sie Ihren PKW auf das Fahren im Winterhalbjahr vorbereiten?",
      "answers": [
          "Ich werde das Fahrzeug mit Winterreifen ausrüsten und eventuell Schneeketten mitführen",
          "Ich werde den Frostschutz im Kühlwasser überprüfen lassen",
          "Ich werde Scheibenfrostschutzmittel in die Scheibenwaschanlage füllen",
          "Ich werde den Frostschutz im Motoröl überprüfen lassen"
      ],
      "correct_answers": [
          "Ich werde das Fahrzeug mit Winterreifen ausrüsten und eventuell Schneeketten mitführen",
          "Ich werde den Frostschutz im Kühlwasser überprüfen lassen",
          "Ich werde Scheibenfrostschutzmittel in die Scheibenwaschanlage füllen"
      ],
      "question_text_fa": "چگونه باید خودروی خود را برای رانندگی در فصل زمستان آماده کنید؟",
      "answers_fa": [
          "من خودرو را با لاستیک‌های زمستانی مجهز می‌کنم و ممکن است زنجیر برف نیز به همراه داشته باشم",
          "من مایع ضد یخ در آب رادیاتور را بررسی می‌کنم",
          "من مایع ضد یخ را به سیستم شستشوی شیشه‌ها اضافه می‌کنم",
          "من مایع ضد یخ را در روغن موتور بررسی می‌کنم"
      ],
      "correct_answer_fa": [
          "من خودرو را با لاستیک‌های زمستانی مجهز می‌کنم و ممکن است زنجیر برف نیز به همراه داشته باشم",
          "من مایع ضد یخ در آب رادیاتور را بررسی می‌کنم",
          "من مایع ضد یخ را به سیستم شستشوی شیشه‌ها اضافه می‌کنم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1703",
      "question_text": "Warum sollten Sie Ihren PKW im Winterhalbjahr mit Winterreifen ausrüsten?",
      "answers": [
          "Weil das Fahrzeug beim Bremsen nicht so leicht ins Schleudern kommt",
          "Weil die Bodenhaftung bei niedrigen Fahrbahntemperaturen besser ist",
          "Weil dadurch der Treibstoffverbrauch reduziert wird",
          "Weil Schneeketten nur auf Winterreifen montiert werden dürfen"
      ],
      "correct_answers": [
          "Weil das Fahrzeug beim Bremsen nicht so leicht ins Schleudern kommt",
          "Weil die Bodenhaftung bei niedrigen Fahrbahntemperaturen besser ist"
      ],
      "question_text_fa": "چرا باید خودروی خود را در فصل زمستان با لاستیک‌های زمستانی مجهز کنید؟",
      "answers_fa": [
          "زیرا خودرو هنگام ترمز کردن به راحتی سر نمی‌خورد",
          "زیرا چسبندگی در دماهای پایین‌تر بهبود می‌یابد",
          "زیرا این کار مصرف سوخت را کاهش می‌دهد",
          "زیرا زنجیر برف فقط بر روی لاستیک‌های زمستانی نصب می‌شود"
      ],
      "correct_answer_fa": [
          "زیرا خودرو هنگام ترمز کردن به راحتی سر نمی‌خورد",
          "زیرا چسبندگی در دماهای پایین‌تر بهبود می‌یابد"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1704",
      "question_text": "Sie fahren in diesem Tunnel mit 80 km/h. Plötzlich leuchtet diese Kontrollleuchte auf. Wie werden Sie sich verhalten?",
      "answers": [
          "Ich gebe Vollgas, um rasch die Pannenbucht bzw. Abstellnische zu erreichen",
          "Ich schalte die Alarmblinkanlage ein, kupple aus und rolle in die Pannenbucht bzw. Abstellnische",
          "In der Pannenbucht bzw. Abstellnische betätige ich den Notruf",
          "Ich fahre im Schritttempo bis zum Ende des Tunnels weiter"
      ],
      "correct_answers": [
          "Ich schalte die Alarmblinkanlage ein, kupple aus und rolle in die Pannenbucht bzw. Abstellnische",
          "In der Pannenbucht bzw. Abstellnische betätige ich den Notruf"
      ],
      "question_text_fa": "شما در این تونل با سرعت 80 کیلومتر در ساعت حرکت می‌کنید. ناگهان این چراغ کنترل روشن می‌شود. چگونه رفتار خواهید کرد؟",
      "answers_fa": [
          "من پدال گاز را تا انتها فشار می‌دهم تا سریعاً به پناهگاه یا محل توقف برسم",
          "من چراغ هشدار را روشن می‌کنم، کلاچ را می‌کشم و به آرامی به پناهگاه یا محل توقف می‌روم",
          "در پناهگاه یا محل توقف شماره اضطراری را می‌زنم",
          "من با سرعت پیاده‌روی تا انتهای تونل ادامه می‌دهم"
      ],
      "correct_answer_fa": [
          "من چراغ هشدار را روشن می‌کنم، کلاچ را می‌کشم و به آرامی به پناهگاه یا محل توقف می‌روم",
          "در پناهگاه یا محل توقف شماره اضطراری را می‌زنم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1705",
      "question_text": "Sie fahren in diesem Tunnel mit 80 km/h. Plötzlich leuchtet diese Kontrollleuchte auf. Warum sollten Sie auskuppeln und in die Pannenbucht bzw. Abstellnische rollen?",
      "answers": [
          "Wenn ich weiterfahre, kann es zu einem Motorschaden kommen",
          "Bei einem Motorschaden kann der PKW ins Schieben oder Schleudern kommen",
          "Wenn der PKW nicht in der Pannenbucht oder der Abstellnische stehenbleibt, ist die Gefahr eines Auffahrunfalles extrem hoch",
          "Wenn ich weiterfahre, besteht die Gefahr, dass der Motor zu brennen beginnt"
      ],
      "correct_answers": [
          "Wenn ich weiterfahre, kann es zu einem Motorschaden kommen",
          "Bei einem Motorschaden kann der PKW ins Schieben oder Schleudern kommen",
          "Wenn der PKW nicht in der Pannenbucht oder der Abstellnische stehenbleibt, ist die Gefahr eines Auffahrunfalles extrem hoch"
      ],
      "question_text_fa": "شما در این تونل با سرعت 80 کیلومتر در ساعت حرکت می‌کنید. ناگهان این چراغ کنترل روشن می‌شود. چرا باید کلاچ را بکشید و به پناهگاه یا محل توقف بروید؟",
      "answers_fa": [
          "اگر ادامه دهم، ممکن است موتور آسیب ببیند",
          "در صورت آسیب به موتور، ممکن است خودرو به سمت جلو یا عقب حرکت کند",
          "اگر خودرو در پناهگاه یا محل توقف نایستد، خطر تصادف بسیار بالا است",
          "اگر ادامه دهم، خطر آتش‌سوزی موتور وجود دارد"
      ],
      "correct_answer_fa": [
          "اگر ادامه دهم، ممکن است موتور آسیب ببیند",
          "در صورت آسیب به موتور، ممکن است خودرو به سمت جلو یا عقب حرکت کند",
          "اگر خودرو در پناهگاه یا محل توقف نایستد، خطر تصادف بسیار بالا است"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  
  {
      "question_number": "1708",
      "question_text": "Sie fahren mit Ihrem PKW. Diese Kontrollleuchte leuchtet auf. Was bedeutet das?",
      "answers": [
          "Die Temperatur der Kühlflüssigkeit des Motors ist niedrig",
          "Der Motor hat noch nicht die Betriebstemperatur erreicht",
          "Es ist zu wenig Kühlflüssigkeit vorhanden",
          "Die Temperatur der Kühlflüssigkeit ist zu hoch"
      ],
      "correct_answers": [
          "Die Temperatur der Kühlflüssigkeit des Motors ist niedrig",
          "Der Motor hat noch nicht die Betriebstemperatur erreicht"
      ],
      "question_text_fa": "شما با خودروی شخصی خود در حال رانندگی هستید. این چراغ هشدار روشن می‌شود. چه معنایی دارد؟",
      "answers_fa": [
          "دمای مایع خنک‌کننده موتور پایین است",
          "موتور هنوز به دمای عملکرد نرسیده است",
          "مایع خنک‌کننده کافی وجود ندارد",
          "دمای مایع خنک‌کننده بسیار بالا است"
      ],
      "correct_answers_fa": [
          "دمای مایع خنک‌کننده موتور پایین است",
          "موتور هنوز به دمای عملکرد نرسیده است"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  }
  ,
  {
      "question_number": "1709",
      "question_text": "Sie fahren mit Ihrem PKW. Diese Kontrollleuchte leuchtet auf. Wie verhalten Sie sich, solang diese Kontrollleuchte leuchtet?",
      "answers": [
          "Ich vermeide starkes Beschleunigen",
          "Ich rechne damit, dass der Fahrzeugmotor aussetzen könnte, wenn ich stark beschleunige",
          "Ich fahre mit möglichst hoher Motordrehzahl",
          "Ich schalte die Fahrzeugheizung ab"
      ],
      "correct_answers": [
          "Ich vermeide starkes Beschleunigen",
          "Ich rechne damit, dass der Fahrzeugmotor aussetzen könnte, wenn ich stark beschleunige"
      ],
      "question_text_fa": "شما با خودروی شخصی خود در حال رانندگی هستید. این چراغ هشدار روشن می‌شود. چگونه رفتار می‌کنید تا زمانی که این چراغ هشدار روشن است؟",
      "answers_fa": [
          "من از شتاب‌گیری شدید خودداری می‌کنم",
          "من انتظار دارم که اگر شتاب‌گیری شدید انجام دهم، موتور خودرو ممکن است از کار بیفتد",
          "من با بالاترین دور موتور ممکن رانندگی می‌کنم",
          "من سیستم گرمایش خودرو را خاموش می‌کنم"
      ],
      "correct_answers_fa": [
          "من از شتاب‌گیری شدید خودداری می‌کنم",
          "من انتظار دارم که اگر شتاب‌گیری شدید انجام دهم، موتور خودرو ممکن است از کار بیفتد"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  }
  ,
  {
      "question_number": "1714",
      "question_text": "Woran erkennen Sie, dass bei Ihrem PKW die Kupplung rutscht?",
      "answers": [
          "Beim starken Gas geben steigt die Motordrehzahl, während sich die Fahrgeschwindigkeit kaum ändert",
          "Beim Bergabfahren ist die Bremswirkung des Motors nur schwach oder nicht spürbar",
          "Das Kupplungspedal wird schwergängig",
          "Das Kupplungspedal wird extrem leichtgängig"
      ],
      "correct_answers": [
          "Beim starken Gas geben steigt die Motordrehzahl, während sich die Fahrgeschwindigkeit kaum ändert",
          "Beim Bergabfahren ist die Bremswirkung des Motors nur schwach oder nicht spürbar"
      ],
      "question_text_fa": "چگونه تشخیص می‌دهید که کلاچ خودروی شما سر می‌خورد؟",
      "answers_fa": [
          "در هنگام گاز دادن شدید، دور موتور افزایش می‌یابد در حالی که سرعت خودرو به‌ندرت تغییر می‌کند",
          "در هنگام حرکت در سرازیری، اثر ترمز موتور ضعیف یا محسوس نیست",
          "پدال کلاچ سخت حرکت می‌کند",
          "پدال کلاچ بسیار سبک عمل می‌کند"
      ],
      "correct_answers_fa": [
          "در هنگام گاز دادن شدید، دور موتور افزایش می‌یابد در حالی که سرعت خودرو به‌ندرت تغییر می‌کند",
          "در هنگام حرکت در سرازیری، اثر ترمز موتور ضعیف یا محسوس نیست"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  }
  ,
  {
      "question_number": "1715",
      "question_text": "Die Kupplung Ihres PKW rutscht. Welche Gefahren können dadurch entstehen?",
      "answers": [
          "Der Motor könnte zu heiß werden, weil der Motor überlastet werden könnte",
          "Der Überholweg wird unerwartet lang, weil das Fahrzeug schlecht beschleunigt",
          "Beim Bergabfahren könnten die Bremsen überlastet werden, weil die Bremswirkung des Motors zu gering sein könnte",
          "Das Schaltgetriebe könnte überlastet werden, weil der Motor überlastet werden könnte"
      ],
      "correct_answers": [
          "Der Überholweg wird unerwartet lang, weil das Fahrzeug schlecht beschleunigt",
          "Beim Bergabfahren könnten die Bremsen überlastet werden, weil die Bremswirkung des Motors zu gering sein könnte"
      ],
      "question_text_fa": "کلاچ خودروی شما سر می‌خورد. چه خطراتی می‌تواند به وجود آید؟",
      "answers_fa": [
          "ممکن است موتور خیلی داغ شود، زیرا موتور ممکن است تحت فشار زیاد قرار بگیرد",
          "مسیر عبور برای سبقت غیرمنتظره طولانی می‌شود، زیرا خودرو بد شتاب می‌گیرد",
          "در هنگام حرکت در سرازیری، ممکن است ترمزها تحت فشار قرار بگیرند، زیرا اثر ترمز موتور ممکن است خیلی کم باشد",
          "ممکن است جعبه دنده تحت فشار قرار بگیرد، زیرا موتور ممکن است تحت فشار زیاد قرار بگیرد"
      ],
      "correct_answers_fa": [
          "مسیر عبور برای سبقت غیرمنتظره طولانی می‌شود، زیرا خودرو بد شتاب می‌گیرد",
          "در هنگام حرکت در سرازیری، ممکن است ترمزها تحت فشار قرار بگیرند، زیرا اثر ترمز موتور ممکن است خیلی کم باشد"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  }
  ,
  {
      "question_number": "1716",
      "question_text": "Ihr PKW hat ein automatisches Schaltgetriebe. Was müssen Sie dann im Fahrbetrieb besonders beachten?",
      "answers": [
          "Vor dem Abschleppen sollte ich die Anweisungen in der Betriebsanleitung des PKW lesen",
          "Beim Bergabfahren in einem starken Gefälle wähle ich eine niedrige Fahrstufe",
          "Beim Bergabfahren wähle ich die Schaltstellung \"N\"",
          "Bei einem Überholvorgang gebe ich möglichst wenig Gas"
      ],
      "correct_answers": [
          "Vor dem Abschleppen sollte ich die Anweisungen in der Betriebsanleitung des PKW lesen",
          "Beim Bergabfahren in einem starken Gefälle wähle ich eine niedrige Fahrstufe"
      ],
      "question_text_fa": "خودروی شما دارای گیربکس اتوماتیک است. در هنگام رانندگی چه مواردی را باید به ویژه رعایت کنید؟",
      "answers_fa": [
          "قبل از یدک کشیدن باید دستورالعمل‌های موجود در دفترچه راهنمای خودرو را بخوانم",
          "در هنگام حرکت به سمت پایین در شیب تند، باید دنده پایین را انتخاب کنم",
          "در هنگام حرکت به سمت پایین، باید وضعیت \"N\" را انتخاب کنم",
          "در حین سبقت، باید کمترین گاز را بدهم"
      ],
      "correct_answer_fa": [
          "قبل از یدک کشیدن باید دستورالعمل‌های موجود در دفترچه راهنمای خودرو را بخوانم",
          "در هنگام حرکت به سمت پایین در شیب تند، باید دنده پایین را انتخاب کنم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1717",
      "question_text": "Ihr PKW hat ein automatisches Schaltgetriebe. Sie wollen den PKW abschleppen lassen. Was beachten Sie dabei?",
      "answers": [
          "Wenn möglich, rufe ich einen professionellen Abschleppdienst",
          "Ich folge genau den Anweisungen in der Betriebsanleitung des PKW",
          "Ich schalte beim Abschleppen auf jeden Fall in die Stellung \"D\"",
          "Ich schalte beim Abschleppen auf jeden Fall in die Stellung \"P\""
      ],
      "correct_answers": [
          "Wenn möglich, rufe ich einen professionellen Abschleppdienst",
          "Ich folge genau den Anweisungen in der Betriebsanleitung des PKW"
      ],
      "question_text_fa": "خودروی شما دارای یک جعبه دنده اتوماتیک است. شما می‌خواهید خودروی خود را به یدک بزنید. در این مورد چه مواردی را باید در نظر داشته باشید؟",
      "answers_fa": [
          "اگر ممکن باشد، یک خدمات یدک‌کشی حرفه‌ای را فرا می‌خوانم",
          "من به دقت دستورالعمل‌های موجود در دفترچه راهنمای خودرو را دنبال می‌کنم",
          "در حین یدک‌کشی حتماً به حالت \"D\" سوئیچ می‌کنم",
          "در حین یدک‌کشی حتماً به حالت \"P\" سوئیچ می‌کنم"
      ],
      "correct_answers_fa": [
          "اگر ممکن باشد، یک خدمات یدک‌کشی حرفه‌ای را فرا می‌خوانم",
          "من به دقت دستورالعمل‌های موجود در دفترچه راهنمای خودرو را دنبال می‌کنم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1718",
      "question_text": "Wozu dienen die einzelnen Positionen des Wählhebels bei diesem automatischen PKW-Getriebe?",
      "answers": [
          "Mit \"P\" sichere ich den stehenden PKW gegen Rollen",
          "Mit \"D/S\" fährt das Fahrzeug vorwärts. Ich kann die Schaltstrategie wählen",
          "Stellung \"N\" schaltet auf Leerlauf",
          "Stellung \"R\" schaltet den Rückwärtsgang"
      ],
      "correct_answers": [
          "Mit \"P\" sichere ich den stehenden PKW gegen Rollen",
          "Mit \"D/S\" fährt das Fahrzeug vorwärts. Ich kann die Schaltstrategie wählen",
          "Stellung \"N\" schaltet auf Leerlauf",
          "Stellung \"R\" schaltet den Rückwärtsgang"
      ],
      "question_text_fa": "موارد مختلف دکمه‌های انتخابی در این جعبه دنده اتوماتیک خودرو چیست؟",
      "answers_fa": [
          "با \"P\" خودرو را در حالت سکون قفل می‌کنم",
          "با \"D/S\" خودرو به جلو حرکت می‌کند. می‌توانم استراتژی تعویض دنده را انتخاب کنم",
          "حالت \"N\" به حالت بی‌بار سوئیچ می‌شود",
          "حالت \"R\" دنده عقب را فعال می‌کند"
      ],
      "correct_answers_fa": [
          "با \"P\" خودرو را در حالت سکون قفل می‌کنم",
          "با \"D/S\" خودرو به جلو حرکت می‌کند. می‌توانم استراتژی تعویض دنده را انتخاب کنم",
          "حالت \"N\" به حالت بی‌بار سوئیچ می‌شود",
          "حالت \"R\" دنده عقب را فعال می‌کند"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1719",
      "question_text": "Sie fahren mit diesem PKW steil bergab. Wie können Sie erreichen, dass die Bremswirkung des Motors stark wirkt?",
      "answers": [
          "Indem ich eine niedrige Gangstufe wähle",
          "Indem ich dauernd mitbremse",
          "Indem ich dauernd Gas gebe",
          "Indem ich den Wählhebel auf \"N\" stelle"
      ],
      "correct_answers": [
          "Indem ich eine niedrige Gangstufe wähle"
      ],
      "question_text_fa": "شما با این خودرو به شدت به سمت پایین در حال حرکت هستید. چگونه می‌توانید مطمئن شوید که اثر ترمز موتور به شدت عمل می‌کند؟",
      "answers_fa": [
          "با انتخاب یک دنده پایین",
          "با ترمز دائمی",
          "با دادن دائمی گاز",
          "با قرار دادن دکمه انتخابی بر روی \"N\""
      ],
      "correct_answers_fa": [
          "با انتخاب یک دنده پایین"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1730",
      "question_text": "Welche Vorteile hat ein PKW mit einer elektronischen Fahrdynamik-Regelung (ESC, DSC, ESP, …) gegenüber einem PKW ohne diesem System?",
      "answers": [
          "Die Fahrdynamik-Regelung kann ohne Zutun des Lenkers einzelne Räder des Fahrzeugs abbremsen",
          "Die Fahrdynamik-Regelung versucht durch einseitiges Bremsen zu verhindern, dass das Fahrzeug schiebt oder schleudert",
          "Die Fahrdynamik-Regelung versucht das Umkippen von Fahrzeugen bei plötzlichen Lenkmanövern zu verhindern",
          "Die Fahrdynamik-Regelung ersetzt im Winter bei steilen Bergauffahrten die Schneeketten"
      ],
      "correct_answers": [
          "Die Fahrdynamik-Regelung kann ohne Zutun des Lenkers einzelne Räder des Fahrzeugs abbremsen",
          "Die Fahrdynamik-Regelung versucht durch einseitiges Bremsen zu verhindern, dass das Fahrzeug schiebt oder schleudert",
          "Die Fahrdynamik-Regelung versucht das Umkippen von Fahrzeugen bei plötzlichen Lenkmanövern zu verhindern"
      ],
      "question_text_fa": "خودرویی با سیستم کنترل دینامیک الکترونیکی (ESC, DSC, ESP و ...) چه مزایایی نسبت به خودرویی بدون این سیستم دارد؟",
      "answers_fa": [
          "سیستم کنترل دینامیک می‌تواند بدون دخالت راننده، برخی از چرخ‌های خودرو را ترمز کند",
          "این سیستم با ترمز یک‌طرفه تلاش می‌کند که از لغزش یا چرخش خودرو جلوگیری کند",
          "این سیستم سعی می‌کند از واژگونی خودروها در مانورهای ناگهانی جلوگیری کند",
          "این سیستم در زمستان در سربالایی‌های تند زنجیرهای برفی را جایگزین می‌کند"
      ],
      "correct_answers_fa": [
          "سیستم کنترل دینامیک می‌تواند بدون دخالت راننده، برخی از چرخ‌های خودرو را ترمز کند",
          "این سیستم با ترمز یک‌طرفه تلاش می‌کند که از لغزش یا چرخش خودرو جلوگیری کند",
          "این سیستم سعی می‌کند از واژگونی خودروها در مانورهای ناگهانی جلوگیری کند"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1731",
      "question_text": "Welche Vorteile hat ein PKW mit Anti-Blockier-System (ABS) gegenüber einem PKW ohne diesem System?",
      "answers": [
          "Bei einer Vollbremsung bleibt das Fahrzeug beschränkt lenkfähig",
          "Mit einem ABS-gebremsten Fahrzeug kann ich eine Kurve schneller durchfahren, ohne ins Schleudern zu geraten",
          "Ich kann länger bremsen, ohne dass die Bremsen überhitzen",
          "Ein ABS-gebremstes Fahrzeug kommt auch bei einer Vollbremsung nicht so leicht ins Schleudern"
      ],
      "correct_answers": [
          "Bei einer Vollbremsung bleibt das Fahrzeug beschränkt lenkfähig",
          "Ein ABS-gebremstes Fahrzeug kommt auch bei einer Vollbremsung nicht so leicht ins Schleudern"
      ],
      "question_text_fa": "چه مزایایی برای یک خودروی سواری با سیستم ضد قفل ترمز (ABS) نسبت به خودروی بدون این سیستم وجود دارد؟",
      "answers_fa": [
          "در هنگام ترمز کامل، خودرو به طور محدود قابل فرمان‌دهی می‌ماند",
          "با خودروی دارای ABS می‌توانم یک پیچ را سریع‌تر بگذرانم بدون اینکه وارد انحراف بشوم",
          "می‌توانم مدت زمان بیشتری ترمز بزنم بدون اینکه ترمزها داغ شوند",
          "یک خودروی دارای ABS حتی در هنگام ترمز کامل به راحتی وارد انحراف نمی‌شود"
      ],
      "correct_answers_fa": [
          "در هنگام ترمز کامل، خودرو به طور محدود قابل فرمان‌دهی می‌ماند",
          "یک خودروی دارای ABS حتی در هنگام ترمز کامل به راحتی وارد انحراف نمی‌شود"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  }
  ,
  {
      "question_number": "1736",
      "question_text": "Was sollten Sie am Profil der Reifen Ihres PKW kontrollieren, um die Verkehrssicherheit sicherzustellen?",
      "answers": [
          "Ob es sich gleichmäßig abnutzt",
          "Ob es die Aufschrift \"Indikator\" hat",
          "Ob die Profiltiefe mindestens 1,6 mm beträgt",
          "Ob es die Farbe behält"
      ],
      "correct_answers": [
          "Ob es sich gleichmäßig abnutzt",
          "Ob die Profiltiefe mindestens 1,6 mm beträgt"
      ],
      "question_text_fa": "برای اطمینان از ایمنی ترافیک، چه مواردی را باید در پروفیل لاستیک‌های خودروی خود بررسی کنید؟",
      "answers_fa": [
          "آیا به صورت یکنواخت فرسوده شده است",
          "آیا نوشته \"شاخص\" را دارد",
          "آیا عمق پروفیل حداقل 1.6 میلی‌متر است",
          "آیا رنگ آن را حفظ می‌کند"
      ],
      "correct_answers_fa": [
          "آیا به صورت یکنواخت فرسوده شده است",
          "آیا عمق پروفیل حداقل 1.6 میلی‌متر است"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1737",
      "question_text": "Die Reifen Ihres PKW haben sich ungleichmäßig abgenutzt. Wie verhalten Sie sich?",
      "answers": [
          "Ich lasse die Ursache in einer Fachwerkstätte feststellen und beheben",
          "Ich werde die Reifen wechseln lassen, wenn sie bis auf die Mindestprofiltiefe abgefahren sind",
          "Ich werde das Reifenprofil nachschneiden lassen, wenn es bis auf die Mindestprofiltiefe abgefahren ist",
          "Ich lasse Luft aus den Reifen"
      ],
      "correct_answers": [
          "Ich lasse die Ursache in einer Fachwerkstätte feststellen und beheben",
          "Ich werde die Reifen wechseln lassen, wenn sie bis auf die Mindestprofiltiefe abgefahren sind"
      ],
      "question_text_fa": "لاستیک‌های خودروی شما به صورت نابرابر فرسوده شده‌اند. شما چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "علت را در یک تعمیرگاه تخصصی بررسی و برطرف می‌کنم",
          "اگر لاستیک‌ها به حداقل عمق پروفیل برسند، آنها را تعویض می‌کنم",
          "اگر لاستیک‌ها به حداقل عمق پروفیل برسند، پروفیل آنها را بازسازی می‌کنم",
          "از لاستیک‌ها هوا خارج می‌کنم"
      ],
      "correct_answers_fa": [
          "علت را در یک تعمیرگاه تخصصی بررسی و برطرف می‌کنم",
          "اگر لاستیک‌ها به حداقل عمق پروفیل برسند، آنها را تعویض می‌کنم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  
  
  {
      "question_number": "1740",
      "question_text": "Welche Informationen enthalten diese Reifenbezeichnungen?",
      "answers": [
          "Die Breite des Reifens beträgt 185 mm. Die Höhe beträgt 55 % der Reifenbreite",
          "Für diesen Reifen benötige ich Felgen mit einem Durchmesser von 15 Zoll",
          "Der Buchstabe \"T\" gibt die Höchstgeschwindigkeit des Reifens mit 190 km/h an",
          "Die Tragfähigkeit (T) beträgt 82 kg"
      ],
      "correct_answers": [
          "Die Breite des Reifens beträgt 185 mm. Die Höhe beträgt 55 % der Reifenbreite",
          "Für diesen Reifen benötige ich Felgen mit einem Durchmesser von 15 Zoll",
          "Der Buchstabe \"T\" gibt die Höchstgeschwindigkeit des Reifens mit 190 km/h an"
      ],
      "question_text_fa": "این نشانه‌های لاستیک چه اطلاعاتی را در بر دارند؟",
      "answers_fa": [
          "عرض لاستیک 185 میلی‌متر است. ارتفاع آن 55 درصد از عرض لاستیک است",
          "برای این لاستیک به رینگ‌هایی با قطر 15 اینچ نیاز دارم",
          "حرف \"T\" حداکثر سرعت لاستیک را با 190 کیلومتر در ساعت نشان می‌دهد",
          "ظرفیت بار (T) برابر با 82 کیلوگرم است"
      ],
      "correct_answers_fa": [
          "عرض لاستیک 185 میلی‌متر است. ارتفاع آن 55 درصد از عرض لاستیک است",
          "برای این لاستیک به رینگ‌هایی با قطر 15 اینچ نیاز دارم",
          "حرف \"T\" حداکثر سرعت لاستیک را با 190 کیلومتر در ساعت نشان می‌دهد"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1741",
      "question_text": "Beachten Sie die Aufschriften am Reifen. Um welche Reifenart handelt es sich hier?",
      "answers": [
          "Um einen Winterreifen",
          "Um einen Sommerreifen",
          "Um einen Spikesreifen",
          "Um einen speziellen Reifen für LKW"
      ],
      "correct_answers": [
          "Um einen Sommerreifen"
      ],
      "question_text_fa": "به نوشته‌های روی لاستیک توجه کنید. این نوع لاستیک چیست؟",
      "answers_fa": [
          "یک لاستیک زمستانی",
          "یک لاستیک تابستانی",
          "یک لاستیک نوک‌تیز",
          "یک لاستیک مخصوص کامیون"
      ],
      "correct_answers_fa": [
          "یک لاستیک تابستانی"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1742",
      "question_text": "Was bedeuten die Buchstaben \"R\" und \"S\" bei dieser Reifenbezeichnung?",
      "answers": [
          "Es handelt sich um einen Radialreifen (\"R\")",
          "Kennzeichen \"S\": Die Bauartgeschwindigkeit des Reifens beträgt 180 km/h",
          "Es handelt sich um einen Sommerreifen (\"S\")",
          "Der Reifen ist für Schnee geeignet (\"S\")"
      ],
      "correct_answers": [
          "Es handelt sich um einen Radialreifen (\"R\")",
          "Kennzeichen \"S\": Die Bauartgeschwindigkeit des Reifens beträgt 180 km/h"
      ],
      "question_text_fa": "حروف \"R\" و \"S\" در این نشانه لاستیک به چه معناست؟",
      "answers_fa": [
          "این یک لاستیک رادیال (\"R\") است",
          "علامت \"S\": حداکثر سرعت ساخت لاستیک 180 کیلومتر در ساعت است",
          "این یک لاستیک تابستانی (\"S\") است",
          "این لاستیک برای برف مناسب است (\"S\")"
      ],
      "correct_answers_fa": [
          "این یک لاستیک رادیال (\"R\") است",
          "علامت \"S\": حداکثر سرعت ساخت لاستیک 180 کیلومتر در ساعت است"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1743",
      "category": "B - Fahrzeugtechnik, Winterbetrieb",
      "question_text": "Was müssen Sie bei der Neubereifung Ihres PKW beachten?",
      "answers": [
          "Bei der Neubereifung muss ich die Angaben der Zulassungsbescheinigung bzw. des Typenscheines oder des COC-Papiers beachten.",
          "Winterreifen müssen nicht der Bauartgeschwindigkeit des Fahrzeuges entsprechen, aber für mindestens 160 km/h geeignet sein.",
          "Sommerreifen müssen der Bauartgeschwindigkeit des Fahrzeuges entsprechen.",
          "Als Winterreifen dürfen Radialreifen und Diagonalreifen gemeinsam verwendet werden."
      ],
      "correct_answers": [
          "Bei der Neubereifung muss ich die Angaben der Zulassungsbescheinigung bzw. des Typenscheines oder des COC-Papiers beachten.",
          "Winterreifen müssen nicht der Bauartgeschwindigkeit des Fahrzeuges entsprechen, aber für mindestens 160 km/h geeignet sein.",
          "Sommerreifen müssen der Bauartgeschwindigkeit des Fahrzeuges entsprechen."
      ],
      "question_text_fa": "چه نکاتی را باید در هنگام تعویض لاستیک خودروی شخصی خود در نظر بگیرید؟",
      "answers_fa": [
          "در هنگام تعویض لاستیک، باید به اطلاعات مندرج در گواهی ثبت یا برگه مشخصات خودرو یا مدارک COC توجه کنم.",
          "لاستیک‌های زمستانی نیازی به تطابق با سرعت طراحی خودرو ندارند، اما باید برای سرعت حداقل 160 کیلومتر در ساعت مناسب باشند.",
          "لاستیک‌های تابستانی باید با سرعت طراحی خودرو تطابق داشته باشند.",
          "استفاده از لاستیک‌های رادیال و دیال در کنار یکدیگر به عنوان لاستیک زمستانی مجاز است."
      ],
      "correct_answers_fa": [
          "در هنگام تعویض لاستیک، باید به اطلاعات مندرج در گواهی ثبت یا برگه مشخصات خودرو یا مدارک COC توجه کنم.",
          "لاستیک‌های زمستانی نیازی به تطابق با سرعت طراحی خودرو ندارند، اما باید برای سرعت حداقل 160 کیلومتر در ساعت مناسب باشند.",
          "لاستیک‌های تابستانی باید با سرعت طراحی خودرو تطابق داشته باشند."
      ]
  }
  ,
  {
      "question_number": "1758",
      "question_text": "Was können Sie an der Lenkung Ihres PKW überprüfen?",
      "answers": [
          "Den Leerweg",
          "Ob die Lenkung nach dem Einbiegen wieder von selbst in die Geradeausfahrt zurückläuft",
          "Ob sie beim Fahren auf eine Seite zieht",
          "Ob beim Lenken ungewöhnliche Geräusche auftreten"
      ],
      "correct_answers": [
          "Den Leerweg",
          "Ob die Lenkung nach dem Einbiegen wieder von selbst in die Geradeausfahrt zurückläuft",
          "Ob sie beim Fahren auf eine Seite zieht",
          "Ob beim Lenken ungewöhnliche Geräusche auftreten"
      ],
      "question_text_fa": "شما چه مواردی را می‌توانید در فرمان خودروی خود بررسی کنید؟",
      "answers_fa": [
          "فاصله خالی",
          "آیا فرمان بعد از پیچیدن به خودی خود به حالت مستقیم برمی‌گردد",
          "آیا هنگام رانندگی به یک سمت کشیده می‌شود",
          "آیا هنگام فرمان‌دادن صداهای غیرعادی به وجود می‌آید"
      ],
      "correct_answers_fa": [
          "فاصله خالی",
          "آیا فرمان بعد از پیچیدن به خودی خود به حالت مستقیم برمی‌گردد",
          "آیا هنگام رانندگی به یک سمت کشیده می‌شود",
          "آیا هنگام فرمان‌دادن صداهای غیرعادی به وجود می‌آید"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1759",
      "question_text": "Sie fahren mit Ihrem PKW auf ebener Fahrbahn geradeaus. Sie bemerken, dass die Lenkung auf eine Seite zieht. Wie verhalten Sie sich?",
      "answers": [
          "Ich halte an und überprüfe den Reifendruck",
          "Wenn der Reifendruck stimmt, lasse ich die Lenkung in einer Fachwerkstatt überprüfen",
          "Ich versuche, das Fahrverhalten durch häufiges Bremsen zu verbessern",
          "Ich versuche, das Fahrverhalten durch neue Reifen zu verbessern"
      ],
      "correct_answers": [
          "Ich halte an und überprüfe den Reifendruck",
          "Wenn der Reifendruck stimmt, lasse ich die Lenkung in einer Fachwerkstatt überprüfen"
      ],
      "question_text_fa": "شما با خودروی خود در جاده صاف در حال حرکت هستید. متوجه می‌شوید که فرمان به یک سمت کشیده می‌شود. چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "متوقف می‌شوم و فشار لاستیک‌ها را بررسی می‌کنم",
          "اگر فشار لاستیک‌ها درست باشد، فرمان را در یک تعمیرگاه تخصصی بررسی می‌کنم",
          "سعی می‌کنم با ترمزهای مکرر رفتار رانندگی را بهبود بخشم",
          "سعی می‌کنم با خرید لاستیک‌های جدید رفتار رانندگی را بهبود بخشم"
      ],
      "correct_answers_fa": [
          "متوقف می‌شوم و فشار لاستیک‌ها را بررسی می‌کنم",
          "اگر فشار لاستیک‌ها درست باشد، فرمان را در یک تعمیرگاه تخصصی بررسی می‌کنم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1760",
      "question_text": "Sie fahren mit Ihrem PKW. Plötzlich leuchtet diese Kontrollleuchte auf. Was bedeutet das?",
      "answers": [
          "Dass ein Fehler bei der Lenkhilfe (Servolenkung) aufgetreten ist",
          "Dass ein Fehler bei den Reifen aufgetreten ist",
          "Dass ein Fehler bei der Motorkühlung aufgetreten ist",
          "Dass der nächste Servicetermin fällig ist"
      ],
      "correct_answers": [
          "Dass ein Fehler bei der Lenkhilfe (Servolenkung) aufgetreten ist"
      ],
      "question_text_fa": "شما با خودروی خود در حال حرکت هستید. ناگهان این چراغ نشانگر روشن می‌شود. این چه معنی دارد؟",
      "answers_fa": [
          "این به این معنی است که یک خطا در کمک فرمان (فرمان برقی) به وجود آمده است",
          "این به این معنی است که یک خطا در لاستیک‌ها به وجود آمده است",
          "این به این معنی است که یک خطا در سیستم خنک‌کننده موتور به وجود آمده است",
          "این به این معنی است که زمان سرویس بعدی فرا رسیده است"
      ],
      "correct_answers_fa": [
          "این به این معنی است که یک خطا در کمک فرمان (فرمان برقی) به وجود آمده است"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1761",
      "question_text": "Sie fahren mit Ihrem PKW. Plötzlich leuchtet diese Kontrollleuchte auf. Wie verhalten Sie sich?",
      "answers": [
          "Ich halte an einer sicheren Stelle an",
          "Ich rechne damit, dass die Lenkung plötzlich wesentlich schwergängiger ist als gewohnt",
          "Ich lese in der Betriebsanleitung des PKW nach, was zu tun ist",
          "Ich fülle Bremsflüssigkeit nach"
      ],
      "correct_answers": [
          "Ich halte an einer sicheren Stelle an",
          "Ich rechne damit, dass die Lenkung plötzlich wesentlich schwergängiger ist als gewohnt",
          "Ich lese in der Betriebsanleitung des PKW nach, was zu tun ist"
      ],
      "question_text_fa": "شما با خودروی خود در حال حرکت هستید. ناگهان این چراغ نشانگر روشن می‌شود. چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "در یک مکان امن متوقف می‌شوم",
          "انتظار دارم که فرمان به طور ناگهانی خیلی سنگین‌تر از آنچه که معمول است باشد",
          "به دفترچه راهنمای خودرو مراجعه می‌کنم تا ببینم چه کاری باید انجام دهم",
          "مایع ترمز را دوباره پر می‌کنم"
      ],
      "correct_answers_fa": [
          "در یک مکان امن متوقف می‌شوم",
          "انتظار دارم که فرمان به طور ناگهانی خیلی سنگین‌تر از آنچه که معمول است باشد",
          "به دفترچه راهنمای خودرو مراجعه می‌کنم تا ببینم چه کاری باید انجام دهم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1762",
      "question_text": "Was bedeutet es, wenn bei Ihrem PKW diese Kontrollleuchte aufleuchtet?",
      "answers": [
          "Dass eine Leuchte defekt geworden ist",
          "Dass der rechte Blinker ausgefallen ist",
          "Dass der linke Blinker ausgefallen ist",
          "Dass die Innenbeleuchtung ausgefallen ist"
      ],
      "correct_answers": [
          "Dass eine Leuchte defekt geworden ist"
      ],
      "question_text_fa": "اگر این چراغ کنترل در خودروی شما روشن شود، چه معنی دارد؟",
      "answers_fa": [
          "اینکه یک چراغ خراب شده است",
          "اینکه چراغ راهنمای راست خراب شده است",
          "اینکه چراغ راهنمای چپ خراب شده است",
          "اینکه روشنایی داخلی خراب شده است"
      ],
      "correct_answers_fa": [
          "اینکه یک چراغ خراب شده است"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1763",
      "question_text": "Bei Ihrem PKW leuchtet diese Kontrollleuchte auf. Wie verhalten Sie sich?",
      "answers": [
          "Ich überprüfe die Leuchten meines PKW",
          "Ich fahre bis zum nächsten Servicetermin weiter",
          "Ich gebe ab sofort Handzeichen",
          "Ich schalte die Nebelschlussleuchten ein"
      ],
      "correct_answers": [
          "Ich überprüfe die Leuchten meines PKW"
      ],
      "question_text_fa": "اگر این چراغ کنترل در خودروی شما روشن شود، چه کار می‌کنید؟",
      "answers_fa": [
          "چراغ‌های خودروی خود را بررسی می‌کنم",
          "تا زمان ملاقات بعدی به راه ادامه می‌دهم",
          "از این به بعد علامت دست می‌زنم",
          "چراغ‌های مه‌شکن را روشن می‌کنم"
      ],
      "correct_answers_fa": [
          "چراغ‌های خودروی خود را بررسی می‌کنم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1766",
      "question_text": "Auf einer Eisenbahnkreuzung stirbt der Benzinmotor Ihres PKW ab und springt nicht mehr an. Wie können Sie den PKW sofort aus dem Gefahrenbereich wegbringen?",
      "answers": [
          "Ich schalte in den Leerlauf, öffne die Fahrertüre und versuche, das Fahrzeug wegzuschieben",
          "Ich lege den 1. Gang ein und starte, ohne die Kupplung zu betätigen, falls das bei meinem Fahrzeug möglich ist",
          "Ich lege den 1. Gang ein, starte und betätige gleichzeitig die Kupplung",
          "Ich lege den Leerlauf ein und starte, ohne die Kupplung zu betätigen"
      ],
      "correct_answers": [
          "Ich schalte in den Leerlauf, öffne die Fahrertüre und versuche, das Fahrzeug wegzuschieben",
          "Ich lege den 1. Gang ein und starte, ohne die Kupplung zu betätigen, falls das bei meinem Fahrzeug möglich ist"
      ],
      "question_text_fa": "در یک تقاطع راه‌آهن، موتور بنزینی خودروی شما خاموش می‌شود و دیگر روشن نمی‌شود. چگونه می‌توانید خودروی خود را بلافاصله از ناحیه خطر دور کنید؟",
      "answers_fa": [
          "در دنده خنثی قرار می‌دهم، درب سمت راننده را باز می‌کنم و سعی می‌کنم خودرو را هل بدهم",
          "دنده ۱ را در می‌آورم و بدون فشار دادن کلاچ روشن می‌کنم، اگر این کار برای خودروی من ممکن باشد",
          "دنده ۱ را در می‌آورم، روشن می‌کنم و همزمان کلاچ را فشار می‌زنم",
          "در دنده خنثی قرار می‌دهم و بدون فشار دادن کلاچ روشن می‌کنم"
      ],
      "correct_answers_fa": [
          "در دنده خنثی قرار می‌دهم، درب سمت راننده را باز می‌کنم و سعی می‌کنم خودرو را هل بدهم",
          "دنده ۱ را در می‌آورم و بدون فشار دادن کلاچ روشن می‌کنم، اگر این کار برای خودروی من ممکن باشد"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1767",
      "question_text": "Auf einer Eisenbahnkreuzung stirbt der Benzinmotor Ihres PKW ab und startet nicht mehr. Warum ist es wichtig, beim \"Wegstarten\" einen Gang eingelegt zu haben?",
      "answers": [
          "Weil der PKW sonst nicht weiterrollt",
          "Weil sonst das Getriebe beschädigt wird",
          "Weil sonst der Motor beschädigt wird",
          "Weil sonst die Kupplung beschädigt wird"
      ],
      "correct_answers": [
          "Weil der PKW sonst nicht weiterrollt"
      ],
      "question_text_fa": "در یک تقاطع راه‌آهن، موتور بنزینی خودروی شما خاموش می‌شود و دیگر روشن نمی‌شود. چرا مهم است که هنگام \"روشن کردن\" یک دنده درگیر باشد؟",
      "answers_fa": [
          "زیرا در غیر این صورت خودرو به جلو حرکت نمی‌کند",
          "زیرا در غیر این صورت گیربکس آسیب می‌بیند",
          "زیرا در غیر این صورت موتور آسیب می‌بیند",
          "زیرا در غیر این صورت کلاچ آسیب می‌بیند"
      ],
      "correct_answers_fa": [
          "زیرا در غیر این صورت خودرو به جلو حرکت نمی‌کند"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "1769",
      "question_text": "Woher wissen Sie, wie hoch der Reifendruck Ihres Fahrzeuges sein soll?",
      "answers": [
          "Das steht in der Zulassungsbescheinigung des Fahrzeuges",
          "Das steht außen am Reifen angeschrieben",
          "Das steht an der Innenseite des Tankdeckels oder der Fahrertüre angeschrieben",
          "Das steht in der Betriebsanleitung des Fahrzeuges"
      ],
      "correct_answers": [
          "Das steht an der Innenseite des Tankdeckels oder der Fahrertüre angeschrieben",
          "Das steht in der Betriebsanleitung des Fahrzeuges"
      ],
      "question_text_fa": "چگونه می‌دانید که فشار تایر خودروی شما باید چقدر باشد؟",
      "answers_fa": [
          "این در گواهی ثبت خودرو نوشته شده است",
          "این روی تایر نوشته شده است",
          "این در سمت داخلی درب مخزن سوخت یا درب سمت راننده نوشته شده است",
          "این در دفترچه راهنمای خودرو نوشته شده است"
      ],
      "correct_answers_fa": [
          "این در سمت داخلی درب مخزن سوخت یا درب سمت راننده نوشته شده است",
          "این در دفترچه راهنمای خودرو نوشته شده است"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2200",
      "question_text": "Wie werden Sie sich hier verhalten?",
      "answers": [
          "Ich fahre auf meinem Fahrstreifen weiter",
          "Ich werde der Anzeige des Navigationssystems folgen und auf den linken Fahrstreifen wechseln",
          "Ich werde in 1.000 m die Ausfahrt zur anderen Autobahn benützen",
          "Ich werde noch 3.300 m auf dieser Autobahn weiterfahren"
      ],
      "correct_answers": [
          "Ich fahre auf meinem Fahrstreifen weiter",
          "Ich werde in 1.000 m die Ausfahrt zur anderen Autobahn benützen"
      ],
      "question_text_fa": "چگونه رفتار خواهید کرد؟",
      "answers_fa": [
          "من در خط خود ادامه می‌دهم",
          "من به نمایشگر سیستم ناوبری توجه می‌کنم و به خط چپ منتقل می‌شوم",
          "من در ۱۰۰۰ متر از خروجی بزرگراه دیگر استفاده می‌کنم",
          "من هنوز ۳۳۰۰ متر دیگر در این بزرگراه ادامه می‌دهم"
      ],
      "correct_answers_fa": [
          "من در خط خود ادامه می‌دهم",
          "من در ۱۰۰۰ متر از خروجی بزرگراه دیگر استفاده می‌کنم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2315",
      "question_text": "Müssen Sie die Angaben auf der Verkehrsbeeinflussungsanlage befolgen? Warum?",
      "answers": [
          "Nein, weil es sich nur um Hinweiszeichen handelt",
          "Nein, weil es sich nur um unverbindliche Informationen zur Verkehrssteuerung handelt",
          "Ja, weil die Verbote und Gebote auf einer Verkehrsbeeinflussungsanlage genauso wie \"normale\" Verkehrszeichen gelten",
          "Ja, weil die Regeln der Straßenverkehrsordnung wichtiger sind als Anweisungen des Navigationssystems"
      ],
      "correct_answers": [
          "Ja, weil die Verbote und Gebote auf einer Verkehrsbeeinflussungsanlage genauso wie \"normale\" Verkehrszeichen gelten",
          "Ja, weil die Regeln der Straßenverkehrsordnung wichtiger sind als Anweisungen des Navigationssystems"
      ],
      "question_text_fa": "آیا باید به اطلاعات ارائه شده در سیستم تأثیرگذاری ترافیک عمل کنید؟ چرا؟",
      "answers_fa": [
          "خیر، زیرا فقط علائم هشداردهنده هستند",
          "خیر، زیرا فقط اطلاعات غیرالزام‌آور برای کنترل ترافیک هستند",
          "بله، زیرا ممنوعیت‌ها و مجوزهای سیستم تأثیرگذاری ترافیک مانند علائم ترافیکی \"عادی\" معتبر هستند",
          "بله، زیرا قوانین آیین‌نامه راهنمایی و رانندگی مهم‌تر از دستورات سیستم ناوبری هستند"
      ],
      "correct_answers_fa": [
          "بله، زیرا ممنوعیت‌ها و مجوزهای سیستم تأثیرگذاری ترافیک مانند علائم ترافیکی \"عادی\" معتبر هستند",
          "بله، زیرا قوانین آیین‌نامه راهنمایی و رانندگی مهم‌تر از دستورات سیستم ناوبری هستند"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2316",
      "question_text": "Ihr PKW ist mit einem eCall-System ausgerüstet. Wozu dient dieses System?",
      "answers": [
          "Es löst bei einem schweren Unfall automatisch einen Notruf aus",
          "Es ruft bei einem technischem Defekt automatisch die Werkstatt an",
          "Es gibt bei einem Stau Hinweise auf die günstigste Ausweichstrecke",
          "Es stellt beim Fahren automatisch den Kontakt zu sozialen Netzwerken her"
      ],
      "correct_answers": [
          "Es löst bei einem schweren Unfall automatisch einen Notruf aus"
      ],
      "question_text_fa": "خودروی شما با سیستم eCall تجهیز شده است. این سیستم چه هدفی دارد؟",
      "answers_fa": [
          "در صورت وقوع تصادف شدید به‌طور خودکار یک تماس اضطراری برقرار می‌کند",
          "در صورت بروز نقص فنی به‌طور خودکار با تعمیرگاه تماس می‌گیرد",
          "در زمان ترافیک نکاتی در مورد بهترین مسیرهای جایگزین ارائه می‌دهد",
          "هنگام رانندگی به‌طور خودکار با شبکه‌های اجتماعی ارتباط برقرار می‌کند"
      ],
      "correct_answers_fa": [
          "در صورت وقوع تصادف شدید به‌طور خودکار یک تماس اضطراری برقرار می‌کند"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2317",
      "question_text": "Ihr PKW ist mit einem eCall-System ausgerüstet. Sie haben auf der Autobahn einen Unfall, bei dem ein Airbag ausgelöst wird. Müssen Sie in diesem Fall selbst die Einsatzkräfte verständigen?",
      "answers": [
          "Nein, weil automatisch ein Notruf abgesetzt wird",
          "Nein, weil der Standort des Fahrzeuges der Einsatzzentrale nach einem Unfall automatisch übermittelt wird",
          "Ja, weil das System nicht immer zuverlässig arbeitet",
          "Ja, um den Unfallort zu melden"
      ],
      "correct_answers": [
          "Nein, weil automatisch ein Notruf abgesetzt wird",
          "Nein, weil der Standort des Fahrzeuges der Einsatzzentrale nach einem Unfall automatisch übermittelt wird"
      ],
      "question_text_fa": "خودروی شما با سیستم eCall تجهیز شده است. اگر در بزرگراه تصادف کنید و ایربگ فعال شود، آیا در این صورت باید خودتان نیروهای امدادی را اطلاع دهید؟",
      "answers_fa": [
          "خیر، زیرا به‌طور خودکار یک تماس اضطراری برقرار می‌شود",
          "خیر، زیرا موقعیت خودرو پس از تصادف به‌طور خودکار به مرکز عملیات ارسال می‌شود",
          "بله، زیرا این سیستم همیشه قابل اعتماد نیست",
          "بله، تا محل تصادف را گزارش دهید"
      ],
      "correct_answers_fa": [
          "خیر، زیرا به‌طور خودکار یک تماس اضطراری برقرار می‌شود",
          "خیر، زیرا موقعیت خودرو پس از تصادف به‌طور خودکار به مرکز عملیات ارسال می‌شود"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2318",
      "question_text": "Was sollten Sie bei der Planung Ihrer Fahrtroute beachten, um möglichst umweltschonend zu fahren?",
      "answers": [
          "Ich hole vor Antritt einer Fahrt Informationen über die aktuelle Verkehrslage ein, um möglichst staufrei fahren zu können",
          "Ich fahre möglichst zu den verkehrsreichsten Zeiten",
          "Ich verwende auf unbekannten Strecken ein Navigationssystem, um Umwege und Suchfahrten zu vermeiden",
          "Ich wähle möglichst oft \"Schleichwege\" durch Siedlungsgebiete"
      ],
      "correct_answers": [
          "Ich hole vor Antritt einer Fahrt Informationen über die aktuelle Verkehrslage ein, um möglichst staufrei fahren zu können",
          "Ich verwende auf unbekannten Strecken ein Navigationssystem, um Umwege und Suchfahrten zu vermeiden"
      ],
      "question_text_fa": "برای برنامه‌ریزی مسیر سفر خود چه نکاتی را باید در نظر بگیرید تا به‌طور ممکن با کمترین آسیب به محیط زیست رانندگی کنید؟",
      "answers_fa": [
          "قبل از شروع سفر اطلاعاتی درباره وضعیت ترافیک جاری به‌دست می‌آورم تا بتوانم بدون ترافیک حرکت کنم",
          "در زمان‌های پر ترافیک حرکت می‌کنم",
          "در مسیرهای ناآشنا از سیستم ناوبری استفاده می‌کنم تا از دور زدن و جستجو جلوگیری کنم",
          "تا حد ممکن \"مسیرهای پنهانی\" از طریق مناطق مسکونی را انتخاب می‌کنم"
      ],
      "correct_answers_fa": [
          "قبل از شروع سفر اطلاعاتی درباره وضعیت ترافیک جاری به‌دست می‌آورم تا بتوانم بدون ترافیک حرکت کنم",
          "در مسیرهای ناآشنا از سیستم ناوبری استفاده می‌کنم تا از دور زدن و جستجو جلوگیری کنم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2324",
      "question_text": "Sie planen Ihre Fahrtroute. Wie können Sie sich über die aktuelle Verkehrslage in Österreich informieren?",
      "answers": [
          "Ich verwende ein Navigationssystem mit RDS-TMC-Funktion",
          "Ich benutze spezielle Apps auf meinem Mobilgerät",
          "Ich höre Verkehrsdurchsagen im Radio ab",
          "Ich informiere mich im Internet"
      ],
      "correct_answers": [
          "Ich verwende ein Navigationssystem mit RDS-TMC-Funktion",
          "Ich benutze spezielle Apps auf meinem Mobilgerät",
          "Ich höre Verkehrsdurchsagen im Radio ab",
          "Ich informiere mich im Internet"
      ],
      "question_text_fa": "شما برنامه‌ریزی می‌کنید که مسیر رانندگی خود را تعیین کنید. چگونه می‌توانید از وضعیت فعلی ترافیک در اتریش مطلع شوید؟",
      "answers_fa": [
          "من از یک سیستم ناوبری با عملکرد RDS-TMC استفاده می‌کنم",
          "من از برنامه‌های خاص در دستگاه موبایل خود استفاده می‌کنم",
          "من در رادیو اخبار ترافیکی را گوش می‌دهم",
          "من در اینترنت اطلاعات کسب می‌کنم"
      ],
      "correct_answers_fa": [
          "من از یک سیستم ناوبری با عملکرد RDS-TMC استفاده می‌کنم",
          "من از برنامه‌های خاص در دستگاه موبایل خود استفاده می‌کنم",
          "من در رادیو اخبار ترافیکی را گوش می‌دهم",
          "من در اینترنت اطلاعات کسب می‌کنم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2325",
      "question_text": "Sie verwenden in Ihrem PKW ein tragbares Navigationssystem. Was beachten Sie bei dessen Verwendung?",
      "answers": [
          "Ich muss das Gerät im PKW so montieren, dass die Sicht und die Bewegungsfreiheit vom Fahrersitz aus nicht beeinträchtigt sind",
          "Ich halte das Gerät während der Fahrt wann immer es möglich ist in der Hand",
          "Ich befolge die Anweisungen des Navigationssystems nur dann, wenn sie den Verkehrsregeln nicht widersprechen",
          "Ich kann davon ausgehen, dass ich mich immer auf die Anweisungen des Systems verlassen kann"
      ],
      "correct_answers": [
          "Ich muss das Gerät im PKW so montieren, dass die Sicht und die Bewegungsfreiheit vom Fahrersitz aus nicht beeinträchtigt sind",
          "Ich befolge die Anweisungen des Navigationssystems nur dann, wenn sie den Verkehrsregeln nicht widersprechen"
      ],
      "question_text_fa": "شما از یک سیستم ناوبری قابل حمل در خودروی خود استفاده می‌کنید. در هنگام استفاده از آن چه مواردی را مدنظر قرار می‌دهید؟",
      "answers_fa": [
          "من باید دستگاه را در خودروی خود طوری نصب کنم که دید و آزادی حرکت از صندلی راننده مختل نشود",
          "من در حین رانندگی هر زمان که ممکن است دستگاه را در دست نگه می‌دارم",
          "من فقط زمانی از دستورات سیستم ناوبری پیروی می‌کنم که با قوانین ترافیکی تضادی نداشته باشد",
          "من می‌توانم فرض کنم که همیشه می‌توانم به دستورات سیستم اعتماد کنم"
      ],
      "correct_answers_fa": [
          "من باید دستگاه را در خودروی خود طوری نصب کنم که دید و آزادی حرکت از صندلی راننده مختل نشود",
          "من فقط زمانی از دستورات سیستم ناوبری پیروی می‌کنم که با قوانین ترافیکی تضادی نداشته باشد"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2326",
      "question_text": "Sie verwenden in Ihrem PKW ein tragbares Navigationssystem. Wie sollten Sie sich bei dessen Bedienung verhalten?",
      "answers": [
          "Ich werde das Fahrziel eingeben, bevor ich losfahre",
          "Ich lasse während der Fahrt meinen Beifahrer das Navigationssystem bedienen",
          "Wenn ich allein fahre, sollte ich notwendige Eingaben in das System während der Fahrt durchführen",
          "Wenn das System Gestensteuerung hat, sollte ich notwendige Eingaben erst während der Fahrt durchführen"
      ],
      "correct_answers": [
          "Ich werde das Fahrziel eingeben, bevor ich losfahre",
          "Ich lasse während der Fahrt meinen Beifahrer das Navigationssystem bedienen"
      ],
      "question_text_fa": "شما از یک سیستم ناوبری قابل حمل در خودروی خود استفاده می‌کنید. در هنگام کار با آن باید چگونه رفتار کنید؟",
      "answers_fa": [
          "من مقصد را قبل از حرکت وارد می‌کنم",
          "من اجازه می‌دهم در حین رانندگی، همراه من سیستم ناوبری را کنترل کند",
          "اگر به تنهایی رانندگی می‌کنم، باید وارد کردن اطلاعات ضروری به سیستم را در حین رانندگی انجام دهم",
          "اگر سیستم کنترل حرکتی دارد، باید وارد کردن اطلاعات ضروری را فقط در حین رانندگی انجام دهم"
      ],
      "correct_answers_fa": [
          "من مقصد را قبل از حرکت وارد می‌کنم",
          "من اجازه می‌دهم در حین رانندگی، همراه من سیستم ناوبری را کنترل کند"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2496",
      "question_text": "Was bedeutet es, wenn diese Kontrollleuchte aufleuchtet?",
      "answers": [
          "Der Reifendruck in einem oder mehreren Reifen weicht vom gespeicherten Sollwert ab",
          "Der Reifendruck im Reserverad ist zu gering",
          "Die Temperatur eines Reifens oder mehrerer Reifen ist zu hoch",
          "Ein oder mehrere Reifen sind nicht richtig befestigt"
      ],
      "correct_answers": [
          "Der Reifendruck in einem oder mehreren Reifen weicht vom gespeicherten Sollwert ab"
      ],
      "question_text_fa": "این چراغ کنترل روشن می‌شود. چه معنایی دارد؟",
      "answers_fa": [
          "فشار تایر در یکی یا چند تایر از مقدار مورد نظر ذخیره شده منحرف شده است",
          "فشار تایر در تایر یدکی کم است",
          "دما در یکی یا چند تایر بیش از حد بالا است",
          "یکی یا چند تایر به درستی نصب نشده‌اند"
      ],
      "correct_answers_fa": [
          "فشار تایر در یکی یا چند تایر از مقدار مورد نظر ذخیره شده منحرف شده است"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2497",
      "question_text": "Wie werden Sie sich verhalten, wenn diese Kontrollleuchte aufleuchtet?",
      "answers": [
          "An der Tankstelle stelle ich den richtigen Reifendruck ein. Danach starte ich das Kontrollsystem für den Reifendruck nach den Angaben in der Betriebsanleitung neu",
          "Ich halte an einer geeigneten Stelle an und mache nur eine Sichtkontrolle der Reifen. Wenn kein Defekt zusehen ist, fahre ich bis zum nächsten Servicetermin weiter",
          "Ich werde für eine Sichtkontrolle der Reifen an einer geeigneten Stelle anhalten",
          "Ich fahre zur nächsten Tankstelle und kontrolliere den Reifendruck mit einem Messgerät"
      ],
      "correct_answers": [
          "An der Tankstelle stelle ich den richtigen Reifendruck ein. Danach starte ich das Kontrollsystem für den Reifendruck nach den Angaben in der Betriebsanleitung neu",
          "Ich werde für eine Sichtkontrolle der Reifen an einer geeigneten Stelle anhalten",
          "Ich fahre zur nächsten Tankstelle und kontrolliere den Reifendruck mit einem Messgerät"
      ],
      "question_text_fa": "چگونه رفتار خواهید کرد اگر این چراغ کنترل روشن شود؟",
      "answers_fa": [
          "در پمپ بنزین فشار تایر صحیح را تنظیم می‌کنم. سپس سیستم کنترل فشار تایر را طبق دستورالعمل‌های موجود در راهنمای کاربری دوباره راه‌اندازی می‌کنم",
          "در یک مکان مناسب توقف می‌کنم و فقط یک بررسی بصری از تایرها انجام می‌دهم. اگر عیبی قابل مشاهده نباشد، تا زمان سرویس بعدی ادامه می‌دهم",
          "من برای بررسی بصری تایرها در یک مکان مناسب توقف می‌کنم",
          "به نزدیک‌ترین پمپ بنزین می‌روم و فشار تایر را با یک دستگاه اندازه‌گیری بررسی می‌کنم"
      ],
      "correct_answers_fa": [
          "در پمپ بنزین فشار تایر صحیح را تنظیم می‌کنم. سپس سیستم کنترل فشار تایر را طبق دستورالعمل‌های موجود در راهنمای کاربری دوباره راه‌اندازی می‌کنم",
          "من برای بررسی بصری تایرها در یک مکان مناسب توقف می‌کنم",
          "به نزدیک‌ترین پمپ بنزین می‌روم و فشار تایر را با یک دستگاه اندازه‌گیری بررسی می‌کنم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2640",
      "question_text": "Sie fahren mit Ihrem PKW. Diese Kontrollleuchte leuchtet auf. Was bedeutet das?",
      "answers": [
          "Dass die Temperatur der Kühlflüssigkeit zu hoch ist",
          "Dass der Motor überhitzen und dadurch blockieren könnte",
          "Dass zu wenig Motoröl vorhanden ist",
          "Dass die Temperatur der Kühlflüssigkeit zu niedrig ist"
      ],
      "correct_answers": [
          "Dass die Temperatur der Kühlflüssigkeit zu hoch ist",
          "Dass der Motor überhitzen und dadurch blockieren könnte"
      ],
      "question_text_fa": "شما با خودروی خود در حال رانندگی هستید. این چراغ کنترل روشن می‌شود. این چه معنایی دارد؟",
      "answers_fa": [
          "این بدان معنی است که دمای مایع خنک‌کننده بسیار بالا است",
          "این بدان معنی است که موتور ممکن است داغ شود و در نتیجه قفل شود",
          "این بدان معنی است که روغن موتور کافی نیست",
          "این بدان معنی است که دمای مایع خنک‌کننده بسیار پایین است"
      ],
      "correct_answers_fa": [
          "این بدان معنی است که دمای مایع خنک‌کننده بسیار بالا است",
          "این بدان معنی است که موتور ممکن است داغ شود و در نتیجه قفل شود"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2641",
      "question_text": "Sie fahren mit Ihrem PKW. Diese Kontrollleuchte leuchtet auf. Wie verhalten Sie sich?",
      "answers": [
          "Ich halte an und überprüfe den Kühlmittelstand",
          "Ich öffne die Motorhaube nur dann, wenn kein Dampf austritt",
          "Wenn ich die Motorhaube geöffnet habe, achte ich darauf, dass sich der Kühlerventilator plötzlich zu drehen beginnen kann",
          "Wenn die Kühlflüssigkeit zu heiß ist, fahre ich sofort in die nächste Werkstätte"
      ],
      "correct_answers": [
          "Ich halte an und überprüfe den Kühlmittelstand",
          "Ich öffne die Motorhaube nur dann, wenn kein Dampf austritt",
          "Wenn ich die Motorhaube geöffnet habe, achte ich darauf, dass sich der Kühlerventilator plötzlich zu drehen beginnen kann"
      ],
      "question_text_fa": "شما با خودروی خود در حال رانندگی هستید. این چراغ کنترل روشن می‌شود. چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "من توقف می‌کنم و سطح مایع خنک‌کننده را بررسی می‌کنم",
          "من فقط زمانی کاپوت را باز می‌کنم که بخار خارج نشود",
          "وقتی کاپوت را باز کردم، مراقب هستم که فن خنک‌کننده ناگهان شروع به چرخش نکند",
          "اگر مایع خنک‌کننده بیش از حد داغ باشد، به سرعت به نزدیک‌ترین تعمیرگاه می‌روم"
      ],
      "correct_answers_fa": [
          "من توقف می‌کنم و سطح مایع خنک‌کننده را بررسی می‌کنم",
          "من فقط زمانی کاپوت را باز می‌کنم که بخار خارج نشود",
          "وقتی کاپوت را باز کردم، مراقب هستم که فن خنک‌کننده ناگهان شروع به چرخش نکند"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2646",
      "question_text": "Ihr PKW hat einen Motor mit Start-Stopp-Automatik. Warum sollten Sie dieses System verwenden?",
      "answers": [
          "Weil dadurch der Treibstoffverbrauch minimiert wird",
          "Weil durch den stehenden Motor kein Schadstoffausstoß erfolgt",
          "Weil damit der Treibstoffverbrauch bei Vollgas minimiert wird",
          "Weil durch den stehenden Motor keine Lärmbelastung erfolgt"
      ],
      "correct_answers": [
          "Weil dadurch der Treibstoffverbrauch minimiert wird",
          "Weil durch den stehenden Motor kein Schadstoffausstoß erfolgt",
          "Weil durch den stehenden Motor keine Lärmbelastung erfolgt"
      ],
      "question_text_fa": "خودروی شما دارای موتوری با سیستم استارت-استاپ است. چرا باید از این سیستم استفاده کنید؟",
      "answers_fa": [
          "زیرا مصرف سوخت کاهش می‌یابد",
          "زیرا با خاموش بودن موتور هیچ آلایندگی ایجاد نمی‌شود",
          "زیرا این کار مصرف سوخت را در زمان شتاب‌گیری به حداقل می‌رساند",
          "زیرا با خاموش بودن موتور هیچ آلودگی صوتی ایجاد نمی‌شود"
      ],
      "correct_answers_fa": [
          "زیرا مصرف سوخت کاهش می‌یابد",
          "زیرا با خاموش بودن موتور هیچ آلایندگی ایجاد نمی‌شود",
          "زیرا با خاموش بودن موتور هیچ آلودگی صوتی ایجاد نمی‌شود"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2647",
      "question_text": "Ihr PKW hat einen Benzin- oder Dieselmotor. In welchen Situationen ist es sinnvoll, den Motor abzustellen?",
      "answers": [
          "Wenn der PKW länger als etwa 20 bis 30 Sekunden stillsteht",
          "Erst dann, wenn der PKW länger als 20 bis 30 Minuten stillsteht",
          "Immer dann, wenn die Fahrzeugheizung nicht benötigt wird",
          "Immer dann, wenn die Klimaanlage nicht benötigt wird"
      ],
      "correct_answers": [
          "Wenn der PKW länger als etwa 20 bis 30 Sekunden stillsteht"
      ],
      "question_text_fa": "خودروی شما دارای موتور بنزینی یا دیزلی است. در چه مواقعی مناسب است که موتور را خاموش کنید؟",
      "answers_fa": [
          "اگر خودروی بیش از ۲۰ تا ۳۰ ثانیه خاموش باشد",
          "تنها در صورتی که خودرو بیش از ۲۰ تا ۳۰ دقیقه خاموش باشد",
          "همیشه هنگامی که گرمایش خودرو مورد نیاز نیست",
          "همیشه هنگامی که تهویه مطبوع مورد نیاز نیست"
      ],
      "correct_answers_fa": [
          "اگر خودروی بیش از ۲۰ تا ۳۰ ثانیه خاموش باشد"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2648",
      "question_text": "Wie können Sie Ihren PKW möglichst umweltfreundlich nutzen?",
      "answers": [
          "Ich versuche, möglichst oft allein zu fahren",
          "Ich vermeide das Fahren zu Stoßzeiten",
          "Wenn möglich, verwende ich \"alternative Kraftstoffe\"",
          "Kurzstrecken werde ich, wenn möglich, zu Fuß oder mit einem umweltfreundlichen Verkehrsmittel zurücklegen"
      ],
      "correct_answers": [
          "Ich vermeide das Fahren zu Stoßzeiten",
          "Wenn möglich, verwende ich \"alternative Kraftstoffe\"",
          "Kurzstrecken werde ich, wenn möglich, zu Fuß oder mit einem umweltfreundlichen Verkehrsmittel zurücklegen"
      ],
      "question_text_fa": "چگونه می‌توانید از خودروی خود به‌طور محیط‌زیست‌پسند استفاده کنید؟",
      "answers_fa": [
          "من سعی می‌کنم تا حد امکان به تنهایی رانندگی کنم",
          "من از رانندگی در زمان‌های شلوغی پرهیز می‌کنم",
          "اگر ممکن باشد، از \"سوخت‌های جایگزین\" استفاده می‌کنم",
          "مسافت‌های کوتاه را اگر ممکن باشد، پیاده یا با وسیله نقلیه‌ای سازگار با محیط‌زیست طی می‌کنم"
      ],
      "correct_answers_fa": [
          "من از رانندگی در زمان‌های شلوغی پرهیز می‌کنم",
          "اگر ممکن باشد، از \"سوخت‌های جایگزین\" استفاده می‌کنم",
          "مسافت‌های کوتاه را اگر ممکن باشد، پیاده یا با وسیله نقلیه‌ای سازگار با محیط‌زیست طی می‌کنم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2649",
      "question_text": "Wie können Sie Ihren PKW mit Benzin- oder Dieselmotor möglichst Treibstoff sparend nutzen?",
      "answers": [
          "Ich fahre vorausschauend und mit möglichst gleichmäßiger Geschwindigkeit",
          "Ich beachte die vorhandenen Schaltanzeigen am Armaturenbrett",
          "Ich fahre möglichst oft knapp hinter anderen Fahrzeugen nach, um den Windschatten ausnutzen zu können",
          "Ich fahre mit möglichst hoher Motordrehzahl"
      ],
      "correct_answers": [
          "Ich fahre vorausschauend und mit möglichst gleichmäßiger Geschwindigkeit",
          "Ich beachte die vorhandenen Schaltanzeigen am Armaturenbrett"
      ],
      "question_text_fa": "چگونه می‌توانید خودروی خود را با موتور بنزینی یا دیزلی به‌طور صرفه‌جویانه استفاده کنید؟",
      "answers_fa": [
          "من به‌صورت پیش‌بینی‌شده و با سرعتی تقریباً یکنواخت رانندگی می‌کنم",
          "من به نمایشگرهای تعویض دنده موجود در داشبورد توجه می‌کنم",
          "من تا حد ممکن به‌دنبال دیگر وسایل نقلیه رانندگی می‌کنم تا از سایه باد بهره‌برداری کنم",
          "من با حداکثر دور موتور رانندگی می‌کنم"
      ],
      "correct_answers_fa": [
          "من به‌صورت پیش‌بینی‌شده و با سرعتی تقریباً یکنواخت رانندگی می‌کنم",
          "من به نمایشگرهای تعویض دنده موجود در داشبورد توجه می‌کنم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2650",
      "question_text": "Ihr PKW hat ein manuell zu betätigendes Schaltgetriebe. Was sollten Sie beim Fahren tun, um Treibstoff zu sparen?",
      "answers": [
          "Ich sollte möglichst lange im 1. Gang fahren",
          "Ich sollte möglichst früh in den nächst höheren Gang schalten",
          "Ab 50 km/h bis 70 km/h sollte ich schon den höchsten Gang verwenden, wenn es die Verkehrssituation erlaubt",
          "Rollt der PKW, sollte ich sofort die Kupplung treten"
      ],
      "correct_answers": [
          "Ich sollte möglichst früh in den nächst höheren Gang schalten",
          "Ab 50 km/h bis 70 km/h sollte ich schon den höchsten Gang verwenden, wenn es die Verkehrssituation erlaubt"
      ],
      "question_text_fa": "خودروی شما دارای یک گیربکس دستی است. برای صرفه‌جویی در سوخت هنگام رانندگی چه باید بکنید؟",
      "answers_fa": [
          "باید تا حد ممکن در دنده ۱ رانندگی کنم",
          "باید تا حد ممکن زودتر به دنده بالاتر بروم",
          "از سرعت ۵۰ تا ۷۰ کیلومتر در ساعت باید از بالاترین دنده استفاده کنم، اگر شرایط ترافیکی اجازه دهد",
          "اگر خودرو در حال حرکت است، باید بلافاصله کلاچ را فشار دهم"
      ],
      "correct_answers_fa": [
          "باید تا حد ممکن زودتر به دنده بالاتر بروم",
          "از سرعت ۵۰ تا ۷۰ کیلومتر در ساعت باید از بالاترین دنده استفاده کنم، اگر شرایط ترافیکی اجازه دهد"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2651",
      "question_text": "Ihr PKW hat ein manuell zu betätigendes Schaltgetriebe. Mit welchem Getriebegang sollten Sie auf ebener Strecke fahren?",
      "answers": [
          "Mit einem möglichst niedrigen Gang und hoher Motordrehzahl",
          "Mit einem möglichst hohen Gang und niedriger Motordrehzahl",
          "Beim Überholen oder zum Einordnen auf eine Autobahn nutze ich einen niedrigen Gang und höhere Motordrehzahlen",
          "Ich versuche, möglichst immer im selben Gang zu fahren"
      ],
      "correct_answers": [
          "Mit einem möglichst hohen Gang und niedriger Motordrehzahl",
          "Beim Überholen oder zum Einordnen auf eine Autobahn nutze ich einen niedrigen Gang und höhere Motordrehzahlen"
      ],
      "question_text_fa": "خودروی شما دارای یک گیربکس دستی است. در یک مسیر صاف با کدام دنده باید رانندگی کنید؟",
      "answers_fa": [
          "با یک دنده پایین و دور موتور بالا",
          "با یک دنده بالا و دور موتور پایین",
          "هنگام سبقت یا ورود به بزرگراه از یک دنده پایین و دور موتور بالا استفاده می‌کنم",
          "سعی می‌کنم تا حد ممکن همیشه در یک دنده رانندگی کنم"
      ],
      "correct_answers_fa": [
          "با یک دنده بالا و دور موتور پایین",
          "هنگام سبقت یا ورود به بزرگراه از یک دنده پایین و دور موتور بالا استفاده می‌کنم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2652",
      "question_text": "Wie sollten Sie sich beim Betrieb Ihres PKW verhalten, um möglichst wenig Treibstoff zu verbrauchen?",
      "answers": [
          "Ich überprüfe regelmäßig den Luftdruck in den Reifen",
          "Ich achte darauf, dass der Kofferraum immer voll beladen ist",
          "Ich schalte alle nicht unbedingt notwendigen Stromverbraucher ab",
          "Ich starte den Motor erst, nachdem ich mir Sitz und Rückspiegel richtig eingestellt habe, und fahre dann sofort los"
      ],
      "correct_answers": [
          "Ich überprüfe regelmäßig den Luftdruck in den Reifen",
          "Ich schalte alle nicht unbedingt notwendigen Stromverbraucher ab",
          "Ich starte den Motor erst, nachdem ich mir Sitz und Rückspiegel richtig eingestellt habe, und fahre dann sofort los"
      ],
      "question_text_fa": "چگونه باید در حین رانندگی با خودروی خود رفتار کنید تا کمترین میزان سوخت را مصرف کنید؟",
      "answers_fa": [
          "من به‌طور منظم فشار باد تایرها را بررسی می‌کنم",
          "به‌این نکته توجه می‌کنم که صندوق عقب همیشه پر باشد",
          "همه وسایل برقی غیرضروری را خاموش می‌کنم",
          "من موتور را فقط پس از تنظیم صحیح صندلی و آینه‌ها روشن می‌کنم و سپس بلافاصله حرکت می‌کنم"
      ],
      "correct_answers_fa": [
          "من به‌طور منظم فشار باد تایرها را بررسی می‌کنم",
          "همه وسایل برقی غیرضروری را خاموش می‌کنم",
          "من موتور را فقط پس از تنظیم صحیح صندلی و آینه‌ها روشن می‌کنم و سپس بلافاصله حرکت می‌کنم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2653",
      "question_text": "Wie können Sie Ihr Fahrzeug umweltschonend warten und pflegen?",
      "answers": [
          "Ich lasse mein Auto möglichst in einer gewerblichen Waschanlage waschen",
          "Ich achte darauf, die vorgeschriebenen Wartungstermine einzuhalten",
          "Ich wasche mein Fahrzeug möglichst oft mit Gartenschlauch und Bürste selbst",
          "Ich wechsle das Motoröl möglichst selbst und entsorge das Altöl in öffentlichen Mülltonnen"
      ],
      "correct_answers": [
          "Ich lasse mein Auto möglichst in einer gewerblichen Waschanlage waschen",
          "Ich achte darauf, die vorgeschriebenen Wartungstermine einzuhalten"
      ],
      "question_text_fa": "چگونه می‌توانید خودروی خود را به‌صورت محیط‌زیست‌پسند نگهداری و تعمیر کنید؟",
      "answers_fa": [
          "تا حد ممکن خودروی خود را در یک کارواش تجاری شستشو می‌دهم",
          "به تاریخ‌های نگهداری تعیین‌شده توجه می‌کنم",
          "تا حد ممکن خودروی خود را با شلنگ و برس بشویم",
          "تا حد ممکن خودم روغن موتور را تعویض می‌کنم و روغن قدیمی را در سطل‌های زباله عمومی دور می‌ریزم"
      ],
      "correct_answers_fa": [
          "تا حد ممکن خودروی خود را در یک کارواش تجاری شستشو می‌دهم",
          "به تاریخ‌های نگهداری تعیین‌شده توجه می‌کنم"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2750",
      "category": "B - Fahrzeugtechnik, Winterbetrieb",
      "question_text": "Sie verwenden in Ihrem PKW ein Navigationssystem. Welche Vorteile hat die Verwendung eines solchen Systems?",
      "answers": [
          "Beim Fahren in unbekannten Gebieten ist das Stresspotenzial geringer.",
          "Da die Navigationsdaten stets aktuell sind, kann ich mich immer darauf verlassen.",
          "Die Gefahr, nicht energiesparend zu fahren, ist geringer.",
          "Bei einem Stau ist es einfacher, eine Ausweichstrecke zu finden."
      ],
      "correct_answers": [
          "Beim Fahren in unbekannten Gebieten ist das Stresspotenzial geringer.",
          "Die Gefahr, nicht energiesparend zu fahren, ist geringer.",
          "Bei einem Stau ist es einfacher, eine Ausweichstrecke zu finden."
      ],
      "question_text_fa": "شما در خودروی خود از یک سیستم ناوبری استفاده می‌کنید. استفاده از چنین سیستمی چه مزایایی دارد؟",
      "answers_fa": [
          "هنگام رانندگی در مناطق ناآشنا، پتانسیل استرس کمتر است.",
          "از آنجا که داده‌های ناوبری همیشه به‌روز هستند، می‌توانم همیشه به آن‌ها اعتماد کنم.",
          "خطر ناتوانی در رانندگی به صورت صرفه‌جویی در مصرف انرژی کمتر است.",
          "در مواقع ترافیک، پیدا کردن مسیر جایگزین آسان‌تر است."
      ],
      "correct_answers_fa": [
          "هنگام رانندگی در مناطق ناآشنا، پتانسیل استرس کمتر است.",
          "خطر ناتوانی در رانندگی به صورت صرفه‌جویی در مصرف انرژی کمتر است.",
          "در مواقع ترافیک، پیدا کردن مسیر جایگزین آسان‌تر است."
      ]
  }
  ,
  {
      "question_number": "2751",
      "question_text": "Sie verwenden in Ihrem PKW ein Navigationssystem. Warum sollten Sie den dabei verwendeten Navigationsdaten nicht blind vertrauen?",
      "answers": [
          "Weil die Daten nicht tagesaktuell sind",
          "Weil die Daten immer zu den Schnellstraßen führen",
          "Weil mich das Gerät unter Umständen dazu auffordert, an verbotenen Stellen umzudrehen",
          "Weil mich das Gerät unter Umständen in Straßen führt, für die mein PKW nicht geeignet ist"
      ],
      "correct_answers": [
          "Weil die Daten nicht tagesaktuell sind",
          "Weil mich das Gerät unter Umständen dazu auffordert, an verbotenen Stellen umzudrehen",
          "Weil mich das Gerät unter Umständen in Straßen führt, für die mein PKW nicht geeignet ist"
      ],
      "question_text_fa": "شما از یک سیستم ناوبری در خودروی خود استفاده می‌کنید. چرا نباید به داده‌های ناوبری استفاده شده اعتماد کورکورانه داشته باشید؟",
      "answers_fa": [
          "زیرا داده‌ها به‌روز نیستند",
          "زیرا داده‌ها همیشه به بزرگراه‌ها می‌رسند",
          "زیرا ممکن است دستگاه مرا به چرخش در مکان‌های ممنوع تشویق کند",
          "زیرا ممکن است دستگاه مرا به خیابان‌هایی هدایت کند که برای خودروی من مناسب نیستند"
      ],
      "correct_answers_fa": [
          "زیرا داده‌ها به‌روز نیستند",
          "زیرا ممکن است دستگاه مرا به چرخش در مکان‌های ممنوع تشویق کند",
          "زیرا ممکن است دستگاه مرا به خیابان‌هایی هدایت کند که برای خودروی من مناسب نیستند"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2752",
      "question_text": "Sie wollen einen PKW kaufen. Warum sollte dieser PKW mit modernen Assistenzsystemen ausgerüstet sein?",
      "answers": [
          "Weil ich dann beim Fahren weniger konzentriert sein muss",
          "Weil ich dann beim Fahren weniger auf den anderen Verkehr achten muss",
          "Weil dann beim Fahren das Risiko, einen Verkehrsunfall zu erleiden, sinkt",
          "Weil dann beim Fahren das Risiko, in kritischen Verkehrssituationen zu spät oder falsch zu reagieren, vermindert wird"
      ],
      "correct_answers": [
          "Weil dann beim Fahren das Risiko, einen Verkehrsunfall zu erleiden, sinkt",
          "Weil dann beim Fahren das Risiko, in kritischen Verkehrssituationen zu spät oder falsch zu reagieren, vermindert wird"
      ],
      "question_text_fa": "شما می‌خواهید یک خودروی بخرید. چرا باید این خودرو به سیستم‌های کمکی مدرن مجهز باشد؟",
      "answers_fa": [
          "زیرا در این صورت هنگام رانندگی کمتر نیاز به تمرکز دارم",
          "زیرا در این صورت هنگام رانندگی کمتر نیاز به توجه به ترافیک دیگر دارم",
          "زیرا در این صورت خطر بروز تصادف کاهش می‌یابد",
          "زیرا در این صورت خطر پاسخ‌گویی دیر یا اشتباه در شرایط بحرانی ترافیکی کاهش می‌یابد"
      ],
      "correct_answers_fa": [
          "زیرا در این صورت خطر بروز تصادف کاهش می‌یابد",
          "زیرا در این صورت خطر پاسخ‌گویی دیر یا اشتباه در شرایط بحرانی ترافیکی کاهش می‌یابد"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "2753",
      "question_text": "Sie wollen einen PKW kaufen. Welche modernen Assistenzsysteme sind sinnvoll?",
      "answers": [
          "Eine Fahrdynamikregelung (ESC, ESP, DSC, usw.)",
          "Parksensoren und Rückfahrkamera",
          "Abstandsassistent und Spurhalteassistent",
          "Fernlichtassistent"
      ],
      "correct_answers": [
          "Eine Fahrdynamikregelung (ESC, ESP, DSC, usw.)",
          "Parksensoren und Rückfahrkamera",
          "Abstandsassistent und Spurhalteassistent",
          "Fernlichtassistent"
      ],
      "question_text_fa": "شما می‌خواهید یک خودروی بخرید. کدام سیستم‌های کمکی مدرن مفید هستند؟",
      "answers_fa": [
          "یک سیستم کنترل پایداری (ESC، ESP، DSC و غیره)",
          "حسگرهای پارک و دوربین عقب",
          "سیستم کمکی فاصله و سیستم کمکی نگهداری در خط",
          "سیستم کمکی نور بالا"
      ],
      "correct_answers_fa": [
          "یک سیستم کنترل پایداری (ESC، ESP، DSC و غیره)",
          "حسگرهای پارک و دوربین عقب",
          "سیستم کمکی فاصله و سیستم کمکی نگهداری در خط",
          "سیستم کمکی نور بالا"
      ],
      "category": "B - Fahrzeugtechnik, Winterbetrieb"
  },
  {
      "question_number": "20",
      "question_text": "Sie fahren mit etwa 60 km/h. Wie werden Sie sich verhalten?",
      "answers": [
          "Ich bremse so lange stark ab, bis ich ausreichende Sicht auf den Gegenverkehr habe",
          "Ich weiche jetzt auf den linken Fahrstreifen aus",
          "Ich betätige die Lichthupe und fahre mit 50 km/h weiter",
          "Ich fahre an den Fußgängern mit etwa 1 m Seitenabstand und etwa 50 km/h vorbei"
      ],
      "correct_answers": [
          "Ich bremse so lange stark ab, bis ich ausreichende Sicht auf den Gegenverkehr habe"
      ],
      "question_text_fa": "شما با سرعت تقریباً 60 کیلومتر در ساعت حرکت می‌کنید. چگونه رفتار خواهید کرد؟",
      "answers_fa": [
          "من تا زمانی که دید کافی به ترافیک مقابل داشته باشم، به شدت ترمز می‌کنم",
          "من حالا به لاین چپ منحرف می‌شوم",
          "من چراغ خطر را روشن می‌کنم و با سرعت 50 کیلومتر در ساعت ادامه می‌دهم",
          "من به عابرین با حدود 1 متر فاصله کناری و با سرعت حدود 50 کیلومتر در ساعت عبور می‌کنم"
      ],
      "correct_answer_fa": [
          "من تا زمانی که دید کافی به ترافیک مقابل داشته باشم، به شدت ترمز می‌کنم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "21",
      "question_text": "Sie fahren mit etwa 60 km/h. Wodurch können Sie eine Gefährdung der Fußgänger vermeiden?",
      "answers": [
          "Indem ich die Fußgänger dazu zwinge, nach rechts auszuweichen",
          "Indem ich die Fußgänger anhupe",
          "Indem ich die Geschwindigkeit rechtzeitig verringere und - wenn nötig - anhalte",
          "Indem ich vorausschauend fahre"
      ],
      "correct_answers": [
          "Indem ich die Geschwindigkeit rechtzeitig verringere und - wenn nötig - anhalte",
          "Indem ich vorausschauend fahre"
      ],
      "question_text_fa": "شما با سرعت تقریباً 60 کیلومتر در ساعت حرکت می‌کنید. چگونه می‌توانید خطر را برای عابرین کاهش دهید؟",
      "answers_fa": [
          "با وادار کردن عابرین به انحراف به سمت راست",
          "با بوق زدن به عابرین",
          "با کاهش به موقع سرعت و در صورت نیاز، توقف",
          "با رانندگی پیش‌بینانه"
      ],
      "correct_answer_fa": [
          "با کاهش به موقع سرعت و در صورت نیاز، توقف",
          "با رانندگی پیش‌بینانه"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "37",
      "question_text": "Wie werden Sie sich hier verhalten?",
      "answers": [
          "Ich werde zu den Fußgängern einen großen Seitenabstand einhalten",
          "Ich fahre nicht auf den Schneeresten",
          "Ich nähere mich bremsend",
          "Ich kann nur dann an den Fußgängern vorbeifahren, wenn ich ausreichende Sicht auf den Gegenverkehr habe"
      ],
      "correct_answers": [
          "Ich werde zu den Fußgängern einen großen Seitenabstand einhalten",
          "Ich nähere mich bremsend",
          "Ich kann nur dann an den Fußgängern vorbeifahren, wenn ich ausreichende Sicht auf den Gegenverkehr habe"
      ],
      "question_text_fa": "شما چگونه در این وضعیت رفتار خواهید کرد؟",
      "answers_fa": [
          "من فاصله کناری زیادی از عابرین حفظ می‌کنم",
          "من بر روی بقایای برف حرکت نمی‌کنم",
          "من به آرامی نزدیک می‌شوم",
          "من فقط می‌توانم در صورتی که دید کافی به ترافیک مقابل داشته باشم، از کنار عابرین عبور کنم"
      ],
      "correct_answer_fa": [
          "من فاصله کناری زیادی از عابرین حفظ می‌کنم",
          "من به آرامی نزدیک می‌شوم",
          "من فقط می‌توانم در صورتی که دید کافی به ترافیک مقابل داشته باشم، از کنار عابرین عبور کنم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "38",
      "question_text": "Ihr PKW ist mit ABS ausgerüstet. Womit müssen Sie rechnen, wenn Sie stark bremsen?",
      "answers": [
          "Dass das Bremspedal zu pulsieren beginnt, wenn das ABS anspricht",
          "Dass die Räder des PKW blockieren",
          "Dass mit dem Lenkrad leichte Lenkkorrekturen notwendig sein könnten",
          "Dass der Bremsweg wegen des Schnees auf der Fahrbahn länger als gewohnt ist"
      ],
      "correct_answers": [
          "Dass das Bremspedal zu pulsieren beginnt, wenn das ABS anspricht",
          "Dass mit dem Lenkrad leichte Lenkkorrekturen notwendig sein könnten",
          "Dass der Bremsweg wegen des Schnees auf der Fahrbahn länger als gewohnt ist"
      ],
      "question_text_fa": "خودروی شما مجهز به سیستم ABS است. هنگام ترمز شدید، باید با چه چیزی روبرو شوید؟",
      "answers_fa": [
          "اینکه پدال ترمز شروع به تپش می‌کند زمانی که ABS فعال می‌شود",
          "اینکه چرخ‌های خودرو قفل می‌کنند",
          "اینکه اصلاحات جزئی با فرمان ممکن است لازم باشد",
          "اینکه به دلیل برف روی جاده، مسافت ترمز طولانی‌تر از حد معمول است"
      ],
      "correct_answers_fa": [
          "اینکه پدال ترمز شروع به تپش می‌کند زمانی که ABS فعال می‌شود",
          "اینکه اصلاحات جزئی با فرمان ممکن است لازم باشد",
          "اینکه به دلیل برف روی جاده، مسافت ترمز طولانی‌تر از حد معمول است"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  }
  ,
  {
      "question_number": "238",
      "question_text": "Sie haben mit Ihrem PKW auf dieser Straße eine Panne. Wie verhalten Sie sich?",
      "answers": [
          "Ich werde die Alarmblinkanlage einschalten",
          "Ich schalte das Fernlicht ein",
          "Ich ziehe die Warnweste an und stelle das Pannendreieck auf",
          "Ich werde das Fahrzeug möglichst rasch entfernen lassen"
      ],
      "correct_answers": [
          "Ich werde die Alarmblinkanlage einschalten",
          "Ich ziehe die Warnweste an und stelle das Pannendreieck auf",
          "Ich werde das Fahrzeug möglichst rasch entfernen lassen"
      ],
      "question_text_fa": "شما در این خیابان با خودروی خود دچار نقص فنی شده‌اید. چگونه رفتار خواهید کرد؟",
      "answers_fa": [
          "من سیستم هشدار را روشن می‌کنم",
          "من چراغ بالای نور را روشن می‌کنم",
          "من جلیقه هشدار را می‌پوشم و مثلث هشدار را قرار می‌دهم",
          "من سعی می‌کنم که خودرو را هر چه سریع‌تر جابجا کنم"
      ],
      "correct_answer_fa": [
          "من سیستم هشدار را روشن می‌کنم",
          "من جلیقه هشدار را می‌پوشم و مثلث هشدار را قرار می‌دهم",
          "من سعی می‌کنم که خودرو را هر چه سریع‌تر جابجا کنم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "239",
      "question_text": "Sie haben mit Ihrem PKW auf dieser Straße eine Panne. Mit welchen besonderen Gefahren müssen Sie dann rechnen?",
      "answers": [
          "Durch die hohe Annäherungsgeschwindigkeit der Nachfolgenden besteht erhöhte Unfallgefahr",
          "Durch das Einschalten der Alarmblinkanlage könnte die Batterie zu stark entladen werden",
          "Wenn ich ohne Warnweste aussteige, werde ich schlechter gesehen",
          "Weil kein Pannenstreifen vorhanden ist, bildet mein Fahrzeug ein Verkehrshindernis"
      ],
      "correct_answers": [
          "Durch die hohe Annäherungsgeschwindigkeit der Nachfolgenden besteht erhöhte Unfallgefahr",
          "Wenn ich ohne Warnweste aussteige, werde ich schlechter gesehen",
          "Weil kein Pannenstreifen vorhanden ist, bildet mein Fahrzeug ein Verkehrshindernis"
      ],
      "question_text_fa": "شما در این خیابان با خودروی خود دچار نقص فنی شده‌اید. با چه خطرات خاصی باید مواجه شوید؟",
      "answers_fa": [
          "به دلیل سرعت بالای نزدیک شدن خودروهای پشت سر، خطر تصادف افزایش می‌یابد",
          "با روشن کردن سیستم هشدار، ممکن است باتری به شدت تخلیه شود",
          "اگر بدون جلیقه هشدار خارج شوم، کمتر دیده می‌شوم",
          "چون هیچ لاین اضطراری وجود ندارد، خودرو من مانع ترافیک می‌شود"
      ],
      "correct_answer_fa": [
          "به دلیل سرعت بالای نزدیک شدن خودروهای پشت سر، خطر تصادف افزایش می‌یابد",
          "اگر بدون جلیقه هشدار خارج شوم، کمتر دیده می‌شوم",
          "چون هیچ لاین اضطراری وجود ندارد، خودرو من مانع ترافیک می‌شود"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "337",
      "question_text": "Sie fahren mit einem PKW. Wie verhalten Sie sich in dieser Verkehrssituation?",
      "answers": [
          "Ich werde außerhalb der Spurrinnen fahren",
          "Ich werde deutlich langsamer als 100 km/h fahren",
          "Ich werde möglichst genau in den Spurrinnen fahren",
          "Ich werde auf den linken Fahrstreifen wechseln"
      ],
      "correct_answers": [
          "Ich werde außerhalb der Spurrinnen fahren",
          "Ich werde deutlich langsamer als 100 km/h fahren"
      ],
      "question_text_fa": "شما با خودرویی در حال حرکت هستید. در این وضعیت ترافیکی چگونه رفتار خواهید کرد؟",
      "answers_fa": [
          "من خارج از شیارهای حرکت می‌کنم",
          "من به طور قابل توجهی با سرعت کمتر از 100 کیلومتر در ساعت حرکت می‌کنم",
          "من سعی می‌کنم دقیقاً در شیارها حرکت کنم",
          "من به لاین چپ تغییر مسیر می‌دهم"
      ],
      "correct_answer_fa": [
          "من خارج از شیارهای حرکت می‌کنم",
          "من به طور قابل توجهی با سرعت کمتر از 100 کیلومتر در ساعت حرکت می‌کنم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "338",
      "question_text": "Woran erkennen Sie, dass Ihr PKW aufzuschwimmen beginnt?",
      "answers": [
          "Die Lenkung wird leichtgängig, und die Lenkbewegungen sind unwirksam",
          "Bei Vorderradantrieb steigt die Motordrehzahl plötzlich stark an",
          "Daran, dass der Motor abstirbt",
          "Daran, dass der PKW besonders schnell auf Lenkbewegungen reagiert"
      ],
      "correct_answers": [
          "Die Lenkung wird leichtgängig, und die Lenkbewegungen sind unwirksam",
          "Bei Vorderradantrieb steigt die Motordrehzahl plötzlich stark an"
      ],
      "question_text_fa": "چگونه متوجه می‌شوید که خودروی شما شروع به شناور شدن کرده است؟",
      "answers_fa": [
          "فرمان به راحتی حرکت می‌کند و حرکات فرمان بی‌اثر هستند",
          "در خودروهای با دیفرانسیل جلو، سرعت چرخش موتور ناگهان به شدت افزایش می‌یابد",
          "به این دلیل که موتور خاموش می‌شود",
          "به این دلیل که خودرو به حرکات فرمان به طور ویژه‌ای سریع پاسخ می‌دهد"
      ],
      "correct_answers_fa": [
          "فرمان به راحتی حرکت می‌کند و حرکات فرمان بی‌اثر هستند",
          "در خودروهای با دیفرانسیل جلو، سرعت چرخش موتور ناگهان به شدت افزایش می‌یابد"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  }
  ,
  {
      "question_number": "1410",
      "question_text": "Sie holen mit Ihrem PKW ein Kind vom Kindergarten ab. Was beachten Sie dabei?",
      "answers": [
          "Ich steige aus und begleite das Kind zum PKW",
          "Ich halte möglichst so an, dass das Kind nicht die Fahrbahn überqueren muss, um zum PKW zu gelangen",
          "Wenn das Kind nicht anders ein- oder aussteigen kann, darf ich ausnahmsweise auch in zweiter Spur halten",
          "Ich benutze, wenn möglich, den Parkplatz beim Kindergarten"
      ],
      "correct_answers": [
          "Ich steige aus und begleite das Kind zum PKW",
          "Ich halte möglichst so an, dass das Kind nicht die Fahrbahn überqueren muss, um zum PKW zu gelangen",
          "Ich benutze, wenn möglich, den Parkplatz beim Kindergarten"
      ],
      "question_text_fa": "شما با خودروی خود یک کودک را از مهد کودک می‌گیرید. در این حین به چه نکاتی توجه می‌کنید؟",
      "answers_fa": [
          "من پیاده می‌شوم و کودک را تا خودرو همراهی می‌کنم",
          "من سعی می‌کنم طوری توقف کنم که کودک نیازی به عبور از خیابان نداشته باشد تا به خودرو برسد",
          "اگر کودک نمی‌تواند به شکل دیگری سوار یا پیاده شود، می‌توانم استثنائاً در لاین دوم توقف کنم",
          "اگر ممکن باشد، از پارکینگ مهد کودک استفاده می‌کنم"
      ],
      "correct_answer_fa": [
          "من پیاده می‌شوم و کودک را تا خودرو همراهی می‌کنم",
          "من سعی می‌کنم طوری توقف کنم که کودک نیازی به عبور از خیابان نداشته باشد تا به خودرو برسد",
          "اگر ممکن باشد، از پارکینگ مهد کودک استفاده می‌کنم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "1411",
      "question_text": "Sie fahren mit Ihrem PKW im Bereich eines Kindergartens. Wie verhalten Sie sich?",
      "answers": [
          "Ich fahre mit erhöhter Aufmerksamkeit und verringere erforderlichenfalls das Tempo",
          "Ich rechne vermehrt damit, dass Kinder plötzlich die Fahrbahn überqueren",
          "Ich achte besonders auf die Fahrbahnränder",
          "Ich darf an Kindergärten nur im Schritttempo vorbei fahren"
      ],
      "correct_answers": [
          "Ich fahre mit erhöhter Aufmerksamkeit und verringere erforderlichenfalls das Tempo",
          "Ich rechne vermehrt damit, dass Kinder plötzlich die Fahrbahn überqueren",
          "Ich achte besonders auf die Fahrbahnränder"
      ],
      "question_text_fa": "شما با خودروی خود در ناحیه مهدکودک در حال حرکت هستید. چگونه رفتار خواهید کرد؟",
      "answers_fa": [
          "من با دقت بیشتری رانندگی می‌کنم و در صورت نیاز سرعت را کاهش می‌دهم",
          "من بیشتر انتظار دارم که کودکان ناگهان از خیابان عبور کنند",
          "من به حاشیه‌های خیابان به ویژه توجه می‌کنم",
          "من فقط می‌توانم در نزدیکی مهدکودک با سرعت پیاده عبور کنم"
      ],
      "correct_answer_fa": [
          "من با دقت بیشتری رانندگی می‌کنم و در صورت نیاز سرعت را کاهش می‌دهم",
          "من بیشتر انتظار دارم که کودکان ناگهان از خیابان عبور کنند",
          "من به حاشیه‌های خیابان به ویژه توجه می‌کنم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "1563",
      "question_text": "Sie haben an dieser Stelle mit Ihrem PKW eine Panne. Wie verhalten Sie sich?",
      "answers": [
          "Ich schalte die Alarmblinkanlage ein",
          "Ich stelle ein Pannendreieck auf",
          "Ich sorge dafür, dass der defekte PKW so rasch wie möglich abgeschleppt wird",
          "Ich ziehe beim Aussteigen eine Warnweste an"
      ],
      "correct_answers": [
          "Ich schalte die Alarmblinkanlage ein",
          "Ich stelle ein Pannendreieck auf",
          "Ich sorge dafür, dass der defekte PKW so rasch wie möglich abgeschleppt wird",
          "Ich ziehe beim Aussteigen eine Warnweste an"
      ],
      "question_text_fa": "شما در این نقطه با خودروی خود دچار نقص فنی شده‌اید. چگونه رفتار خواهید کرد؟",
      "answers_fa": [
          "من سیستم هشدار را روشن می‌کنم",
          "من مثلث هشدار را قرار می‌دهم",
          "من مطمئن می‌شوم که خودروی خراب هر چه سریع‌تر حمل شود",
          "من هنگام پیاده شدن یک جلیقه هشدار می‌پوشم"
      ],
      "correct_answer_fa": [
          "من سیستم هشدار را روشن می‌کنم",
          "من مثلث هشدار را قرار می‌دهم",
          "من مطمئن می‌شوم که خودروی خراب هر چه سریع‌تر حمل شود",
          "من هنگام پیاده شدن یک جلیقه هشدار می‌پوشم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "1564",
      "question_text": "Sie haben an dieser Stelle mit Ihrem PKW eine Panne. In welcher Entfernung zum PKW stellen Sie das Pannendreieck auf?",
      "answers": [
          "So weit, dass schnell fahrende, von hinten kommende Fahrzeuge anhalten können",
          "25 bis 50 m hinter meinem PKW",
          "50 bis 100 m vor meinem PKW",
          "So weit, dass schnell fahrende, von vorne kommende Fahrzeuge anhalten können"
      ],
      "correct_answers": [
          "So weit, dass schnell fahrende, von hinten kommende Fahrzeuge anhalten können"
      ],
      "question_text_fa": "شما در این نقطه با خودروی خود دچار نقص فنی شده‌اید. در چه فاصله‌ای از خودرو مثلث هشدار را قرار می‌دهید؟",
      "answers_fa": [
          "به اندازه‌ای که خودروهای سریع‌السیر که از پشت می‌آیند، بتوانند توقف کنند",
          "25 تا 50 متر پشت خودروی من",
          "50 تا 100 متر جلوی خودروی من",
          "به اندازه‌ای که خودروهای سریع‌السیر که از جلو می‌آیند، بتوانند توقف کنند"
      ],
      "correct_answer_fa": [
          "به اندازه‌ای که خودروهای سریع‌السیر که از پشت می‌آیند، بتوانند توقف کنند"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "1685",
      "question_text": "Sie fahren mit ca. 110 km/h. Der LKW hat zu blinken begonnen. Wie können Sie sich verkehrssicher verhalten?",
      "answers": [
          "Ich reduziere wenn nötig die Geschwindigkeit und lasse den LKW den Fahrstreifen wechseln",
          "Ich mache einen Fahrstreifenwechsel nach links",
          "Ich fahre mit unverminderter Geschwindigkeit auf diesem Fahrstreifen weiter",
          "Ich gebe dem LKW Zeichen mit der Lichthupe und weiche nach rechts aus"
      ],
      "correct_answers": [
          "Ich reduziere wenn nötig die Geschwindigkeit und lasse den LKW den Fahrstreifen wechseln",
          "Ich mache einen Fahrstreifenwechsel nach links"
      ],
      "question_text_fa": "شما با سرعت تقریباً 110 کیلومتر در ساعت حرکت می‌کنید. کامیون شروع به چراغ زدن کرده است. چگونه می‌توانید به طور ایمن رفتار کنید؟",
      "answers_fa": [
          "اگر لازم باشد سرعت را کاهش می‌دهم و اجازه می‌دهم کامیون لاین خود را عوض کند",
          "من به سمت چپ تغییر مسیر می‌دهم",
          "من با سرعت ثابت در این لاین ادامه می‌دهم",
          "من به کامیون علامت می‌زنم و به سمت راست منحرف می‌شوم"
      ],
      "correct_answer_fa": [
          "اگر لازم باشد سرعت را کاهش می‌دهم و اجازه می‌دهم کامیون لاین خود را عوض کند",
          "من به سمت چپ تغییر مسیر می‌دهم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "1686",
      "question_text": "Sie fahren mit ca. 110 km/h. Der LKW hat zu blinken begonnen. Warum dürfen Sie hier den Fahrstreifen wechseln?",
      "answers": [
          "Weil kein Überholverbot besteht",
          "Weil ich selbst nicht überholt werde",
          "Weil ich hier meinen Fahrstreifen frei wählen darf",
          "Weil es sich um ein Nebeneinanderfahren von Kolonnen handelt"
      ],
      "correct_answers": [
          "Weil kein Überholverbot besteht",
          "Weil ich selbst nicht überholt werde"
      ],
      "question_text_fa": "شما با سرعت تقریباً 110 کیلومتر در ساعت حرکت می‌کنید. کامیون شروع به چراغ زدن کرده است. چرا می‌توانید در اینجا لاین خود را تغییر دهید؟",
      "answers_fa": [
          "چون هیچ ممنوعیتی برای عبور وجود ندارد",
          "چون من خودم در حال عبور نیستم",
          "چون می‌توانم در اینجا لاین خود را به دلخواه انتخاب کنم",
          "چون در حال هم‌زمانی چندین خودرو هستم"
      ],
      "correct_answer_fa": [
          "چون هیچ ممنوعیتی برای عبور وجود ندارد",
          "چون من خودم در حال عبور نیستم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "1796",
      "question_text": "Sie bringen mit Ihrem PKW ein Volksschulkind zur Schule. Was beachten Sie dabei?",
      "answers": [
          "Ich benutze, wenn möglich, den Parkplatz bei der Schule",
          "Ich halte möglichst so an, dass das Kind nicht die Fahrbahn überqueren muss, um zur Schule zu gelangen",
          "Ich lasse das Kind auf der dem Gehsteig zugewandten Seite aussteigen",
          "Ich darf nur dann in zweiter Spur halten, wenn das Kind nicht anders aussteigen kann"
      ],
      "correct_answers": [
          "Ich benutze, wenn möglich, den Parkplatz bei der Schule",
          "Ich halte möglichst so an, dass das Kind nicht die Fahrbahn überqueren muss, um zur Schule zu gelangen",
          "Ich lasse das Kind auf der dem Gehsteig zugewandten Seite aussteigen"
      ],
      "question_text_fa": "شما با خودروی خود یک کودک دبستانی را به مدرسه می‌برید. در این حین به چه نکاتی توجه می‌کنید؟",
      "answers_fa": [
          "اگر ممکن باشد، از پارکینگ مدرسه استفاده می‌کنم",
          "من سعی می‌کنم طوری توقف کنم که کودک نیازی به عبور از خیابان نداشته باشد تا به مدرسه برسد",
          "من کودک را در سمت خیابان پیاده می‌کنم",
          "من فقط در صورتی که کودک نتواند به شکل دیگری پیاده شود، در لاین دوم توقف می‌کنم"
      ],
      "correct_answer_fa": [
          "اگر ممکن باشد، از پارکینگ مدرسه استفاده می‌کنم",
          "من سعی می‌کنم طوری توقف کنم که کودک نیازی به عبور از خیابان نداشته باشد تا به مدرسه برسد",
          "من کودک را در سمت خیابان پیاده می‌کنم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "1797",
      "question_text": "Sie fahren mit Ihrem PKW im Bereich einer Schule. Wie verhalten Sie sich?",
      "answers": [
          "Ich fahre mit erhöhter Aufmerksamkeit und fahre erforderlichenfalls langsamer",
          "Ich achte besonders auf die Fahrbahnränder",
          "Ich rechne vermehrt damit, dass plötzlich Kinder über die Fahrbahn laufen",
          "Ich darf an Schulen nur im Schritttempo vorbei fahren"
      ],
      "correct_answers": [
          "Ich fahre mit erhöhter Aufmerksamkeit und fahre erforderlichenfalls langsamer",
          "Ich achte besonders auf die Fahrbahnränder",
          "Ich rechne vermehrt damit, dass plötzlich Kinder über die Fahrbahn laufen"
      ],
      "question_text_fa": "شما با خودروی خود در ناحیه یک مدرسه در حال حرکت هستید. چگونه رفتار خواهید کرد؟",
      "answers_fa": [
          "من با دقت بیشتری رانندگی می‌کنم و در صورت نیاز آهسته‌تر حرکت می‌کنم",
          "من به حاشیه‌های خیابان به ویژه توجه می‌کنم",
          "من بیشتر انتظار دارم که ناگهان کودکان به خیابان بیایند",
          "من فقط می‌توانم در نزدیکی مدارس با سرعت پیاده عبور کنم"
      ],
      "correct_answer_fa": [
          "من با دقت بیشتری رانندگی می‌کنم و در صورت نیاز آهسته‌تر حرکت می‌کنم",
          "من به حاشیه‌های خیابان به ویژه توجه می‌کنم",
          "من بیشتر انتظار دارم که ناگهان کودکان به خیابان بیایند"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "1798",
      "question_text": "Sie fahren mit Ihrem PKW und wollen ein Erinnerungsfoto machen. Wie verhalten Sie sich?",
      "answers": [
          "Ich halte erst bei einem Parkplatz an",
          "Ich darf nicht so langsam fahren, dass ich den nachfolgenden Verkehr behindere",
          "Ich mache mit meinem Mobiltelefon ein Foto während des Fahrens",
          "Ich halte an dieser Stelle kurz an, steige aus und mache ein Foto"
      ],
      "correct_answers": [
          "Ich halte erst bei einem Parkplatz an",
          "Ich darf nicht so langsam fahren, dass ich den nachfolgenden Verkehr behindere"
      ],
      "question_text_fa": "شما با خودروی خود در حال حرکت هستید و می‌خواهید یک عکس یادگاری بگیرید. چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "من فقط در یک پارکینگ توقف می‌کنم",
          "من نمی‌توانم آنقدر آهسته حرکت کنم که ترافیک پشت سر را مختل کنم",
          "من هنگام رانندگی با تلفن همراه عکس می‌گیرم",
          "من در اینجا به سرعت توقف می‌کنم، پیاده می‌شوم و یک عکس می‌گیرم"
      ],
      "correct_answer_fa": [
          "من فقط در یک پارکینگ توقف می‌کنم",
          "من نمی‌توانم آنقدر آهسته حرکت کنم که ترافیک پشت سر را مختل کنم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "1799",
      "question_text": "Sie fahren hier mit einem voll beladenen Klein-LKW sehr langsam. Sie bemerken, dass sich hinter Ihrem Fahrzeug eine Kolonne gebildet hat. Wie verhalten Sie sich?",
      "answers": [
          "Ich werde dort, wo es möglich ist, am rechten Fahrbahnrand halten und die Kolonne vorbeilassen",
          "Ich fahre ganz rechts und lasse an geeigneten Stellen überholen",
          "Ich muss am Bankett halten, damit nachfolgende Fahrzeuge vorbeifahren können",
          "Ich fahre ohne mich um die Kolonne zu kümmern weiter"
      ],
      "correct_answers": [
          "Ich werde dort, wo es möglich ist, am rechten Fahrbahnrand halten und die Kolonne vorbeilassen",
          "Ich fahre ganz rechts und lasse an geeigneten Stellen überholen"
      ],
      "question_text_fa": "شما با یک کامیون کوچک کاملاً بارگذاری شده بسیار آهسته در حال حرکت هستید. شما متوجه می‌شوید که پشت خودرویتان یک صف تشکیل شده است. چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "من در جایی که ممکن است، در لبه سمت راست توقف می‌کنم و اجازه می‌دهم صف عبور کند",
          "من کاملاً در سمت راست می‌روم و اجازه می‌دهم در جاهای مناسب عبور کنند",
          "من باید در لبه جاده توقف کنم تا خودروهای عقب‌مانده بتوانند عبور کنند",
          "من بدون توجه به صف به حرکت خود ادامه می‌دهم"
      ],
      "correct_answer_fa": [
          "من در جایی که ممکن است، در لبه سمت راست توقف می‌کنم و اجازه می‌دهم صف عبور کند",
          "من کاملاً در سمت راست می‌روم و اجازه می‌دهم در جاهای مناسب عبور کنند"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "1806",
      "question_text": "Sie haben mit Ihrem PKW auf einer Autobahn eine Panne. Der PKW steht auf dem Pannenstreifen. Wie verhalten Sie sich?",
      "answers": [
          "Ich sorge dafür, dass der PKW möglichst rasch entfernt wird",
          "Ich lasse die Alarmblinkanlage eingeschaltet",
          "Ich versuche unter allen Umständen, bis zum nächsten Rastplatz zu gehen und dort Hilfe zu holen",
          "Ich ziehe eine Warnweste an, bevor ich aus meinem PKW aussteige"
      ],
      "correct_answers": [
          "Ich sorge dafür, dass der PKW möglichst rasch entfernt wird",
          "Ich lasse die Alarmblinkanlage eingeschaltet",
          "Ich ziehe eine Warnweste an, bevor ich aus meinem PKW aussteige"
      ],
      "question_text_fa": "شما با خودروی خود در اتوبان دچار نقص فنی شده‌اید. خودروی شما در حاشیه پارک شده است. چگونه رفتار خواهید کرد؟",
      "answers_fa": [
          "من مطمئن می‌شوم که خودروی من هر چه سریع‌تر برداشته شود",
          "من سیستم هشدار را روشن نگه می‌دارم",
          "من تحت هر شرایطی سعی می‌کنم به نزدیک‌ترین استراحتگاه بروم و کمک بگیرم",
          "من قبل از اینکه از خودروی خود پیاده شوم، یک جلیقه هشدار می‌پوشم"
      ],
      "correct_answer_fa": [
          "من مطمئن می‌شوم که خودروی من هر چه سریع‌تر برداشته شود",
          "من سیستم هشدار را روشن نگه می‌دارم",
          "من قبل از اینکه از خودروی خود پیاده شوم، یک جلیقه هشدار می‌پوشم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "1807",
      "question_text": "Welche Funktion haben Notrufsäulen und wie werden sie gefunden?",
      "answers": [
          "Sie dienen als Ersatz für das öffentliche Telefonnetz",
          "Damit kann über eine Leitstelle bei Pannen oder Unfällen Hilfe geholt werden",
          "Auf Leitpflöcken oder Leitschienen können Pfeile angebracht sein, welche die Richtung zur nächsten Notrufsäule anzeigen",
          "Die Lage der nächsten Notrufsäule kann über Kartendienste im Internet gefunden werden"
      ],
      "correct_answers": [
          "Damit kann über eine Leitstelle bei Pannen oder Unfällen Hilfe geholt werden",
          "Auf Leitpflöcken oder Leitschienen können Pfeile angebracht sein, welche die Richtung zur nächsten Notrufsäule anzeigen"
      ],
      "question_text_fa": "عملکرد ستون‌های تماس اضطراری چیست و چگونه می‌توان آنها را پیدا کرد؟",
      "answers_fa": [
          "آنها به عنوان جایگزینی برای شبکه تلفن عمومی عمل می‌کنند",
          "با آنها می‌توان از یک مرکز راهنمایی کمک در مواقع نقص فنی یا تصادف گرفت",
          "روی علامت‌های راهنما یا نوارهای حفاظتی می‌توان فلش‌هایی نصب کرد که جهت نزدیک‌ترین ستون تماس اضطراری را نشان می‌دهند",
          "مکان نزدیک‌ترین ستون تماس اضطراری را می‌توان از طریق خدمات نقشه اینترنتی پیدا کرد"
      ],
      "correct_answer_fa": [
          "با آنها می‌توان از یک مرکز راهنمایی کمک در مواقع نقص فنی یا تصادف گرفت",
          "روی علامت‌های راهنما یا نوارهای حفاظتی می‌توان فلش‌هایی نصب کرد که جهت نزدیک‌ترین ستون تماس اضطراری را نشان می‌دهند"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "1808",
      "question_text": "Sie fahren mit einem PKW. Wie verhalten Sie sich in dieser Verkehrssituation?",
      "answers": [
          "Ich werde außerhalb der Spurrinnen fahren",
          "Ich werde deutlich langsamer als 130 km/h fahren",
          "Ich werde möglichst genau in den Spurrinnen fahren",
          "Ich werde im Bereich der Spurrinnen auf den Pannenstreifen ausweichen"
      ],
      "correct_answers": [
          "Ich werde außerhalb der Spurrinnen fahren",
          "Ich werde deutlich langsamer als 130 km/h fahren"
      ],
      "question_text_fa": "شما با خودروی خود در حال حرکت هستید. چگونه در این وضعیت ترافیکی رفتار خواهید کرد؟",
      "answers_fa": [
          "من خارج از شیارهای چرخ حرکت می‌کنم",
          "من با سرعت بسیار کمتری از 130 کیلومتر در ساعت حرکت می‌کنم",
          "من سعی می‌کنم دقیقاً در شیارهای چرخ حرکت کنم",
          "من در ناحیه شیارهای چرخ به حاشیه پارک می‌کنم"
      ],
      "correct_answer_fa": [
          "من خارج از شیارهای چرخ حرکت می‌کنم",
          "من با سرعت بسیار کمتری از 130 کیلومتر در ساعت حرکت می‌کنم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "1809",
      "question_text": "Sie fahren mit einem PKW. Wie verhalten Sie sich, wenn Aquaplaning auftritt?",
      "answers": [
          "Ich werde vom Gaspedal gehen und auskuppeln",
          "Ich werde stark bremsen",
          "Ich werde rasch nach links oder rechts lenken",
          "Ich werde Vollgas geben"
      ],
      "correct_answers": [
          "Ich werde vom Gaspedal gehen und auskuppeln"
      ],
      "question_text_fa": "شما با خودروی خود در حال حرکت هستید. چگونه رفتار خواهید کرد اگر آب‌گرفتگی (آکواپلانیگ) رخ دهد؟",
      "answers_fa": [
          "من از پدال گاز فاصله می‌گیرم و کلاچ را می‌کشم",
          "من به شدت ترمز می‌کنم",
          "من سریعاً به چپ یا راست می‌چرخم",
          "من گاز را تا انتها می‌زنم"
      ],
      "correct_answer_fa": [
          "من از پدال گاز فاصله می‌گیرم و کلاچ را می‌کشم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2004",
      "question_text": "Sie befördern in Ihrem PKW andere Personen. Der PKW ist wegen einer Panne gerade auf dem Pannenstreifen einer Autobahn ausgerollt. Welche Maßnahmen sollten Sie zur Absicherung treffen?",
      "answers": [
          "Ich schalte die Alarmblinkanlage ein",
          "Ich ziehe die Warnweste an und stelle das Pannendreieck auf",
          "Ich werde die Fahrzeuginsassen hinter der Leitschiene in Sicherheit bringen",
          "Ich lasse alle Personen am Pannenstreifen stehen"
      ],
      "correct_answers": [
          "Ich schalte die Alarmblinkanlage ein",
          "Ich ziehe die Warnweste an und stelle das Pannendreieck auf",
          "Ich werde die Fahrzeuginsassen hinter der Leitschiene in Sicherheit bringen"
      ],
      "question_text_fa": "شما در خودروی خود سایر افراد را حمل می‌کنید. خودروی شما به دلیل نقص فنی در حاشیه اتوبان پارک شده است. چه اقداماتی برای ایمن‌سازی باید انجام دهید؟",
      "answers_fa": [
          "من سیستم هشدار را روشن می‌کنم",
          "من جلیقه هشدار می‌پوشم و مثلث هشدار را قرار می‌دهم",
          "من سرنشینان خودرو را به پشت نوار حفاظتی می‌برم",
          "من اجازه می‌دهم همه افراد در حاشیه پارک بمانند"
      ],
      "correct_answer_fa": [
          "من سیستم هشدار را روشن می‌کنم",
          "من جلیقه هشدار می‌پوشم و مثلث هشدار را قرار می‌دهم",
          "من سرنشینان خودرو را به پشت نوار حفاظتی می‌برم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2024",
      "question_text": "Sie müssen das Pannendreieck aufstellen. Welche Maßnahmen sollten Sie dabei zur eigenen Sicherheit treffen?",
      "answers": [
          "Ich halte das Pannendreieck vor meinen Körper, während ich dem Verkehr entgegengehe",
          "Ich gehe am Pannenstreifen, Bankett oder möglichst am Fahrbahnrand",
          "Ich laufe mit dem Pannendreieck unter dem Arm dem Verkehr entgegen",
          "Ich gehe auf dem ersten Fahrstreifen, um besser gesehen zu werden"
      ],
      "correct_answers": [
          "Ich halte das Pannendreieck vor meinen Körper, während ich dem Verkehr entgegengehe",
          "Ich gehe am Pannenstreifen, Bankett oder möglichst am Fahrbahnrand"
      ],
      "question_text_fa": "شما باید مثلث هشدار را قرار دهید. چه اقداماتی برای ایمنی خود باید انجام دهید؟",
      "answers_fa": [
          "من مثلث هشدار را جلوی بدنم نگه می‌دارم در حالی که به سمت ترافیک می‌روم",
          "من در حاشیه پارک، کنار جاده یا در حاشیه خیابان حرکت می‌کنم",
          "من مثلث هشدار را زیر بغل خود نگه می‌دارم و به سمت ترافیک می‌روم",
          "من در لاین اول می‌روم تا بهتر دیده شوم"
      ],
      "correct_answer_fa": [
          "من مثلث هشدار را جلوی بدنم نگه می‌دارم در حالی که به سمت ترافیک می‌روم",
          "من در حاشیه پارک، کنار جاده یا در حاشیه خیابان حرکت می‌کنم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2100",
      "question_text": "Sie haben mit Ihrem PKW an dieser Stelle eine Panne. Müssen Sie beim Aussteigen eine Warnweste tragen? Warum?",
      "answers": [
          "Ja, weil es sich um eine Autostraße handelt",
          "Nein, weil Tageslicht herrscht",
          "Nein, weil keine Sichtbehinderung herrscht",
          "Ja, weil ich die Warnweste auf Freilandstraßen immer tragen muss"
      ],
      "correct_answers": [
          "Ja, weil es sich um eine Autostraße handelt"
      ],
      "question_text_fa": "شما در این نقطه با خودروی خود دچار نقص فنی شده‌اید. آیا باید هنگام پیاده شدن یک جلیقه هشدار بپوشید؟ چرا؟",
      "answers_fa": [
          "بله، چون این یک جاده اتومبیل‌رو است",
          "خیر، چون روشنایی روز وجود دارد",
          "خیر، چون هیچ موانع دیدی وجود ندارد",
          "بله، چون من همیشه باید در جاده‌های آزاد یک جلیقه هشدار بپوشم"
      ],
      "correct_answer_fa": [
          "بله، چون این یک جاده اتومبیل‌رو است"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2101",
      "question_text": "Sie haben mit Ihrem PKW an dieser Stelle eine Panne. In welcher Entfernung hinter dem PKW stellen Sie das Pannendreieck auf?",
      "answers": [
          "Etwa 150 m bis 200 m",
          "Etwa 25 m bis 50 m",
          "Etwa 250 m bis 400 m",
          "Etwa 70 m bis 100 m"
      ],
      "correct_answers": [
          "Etwa 150 m bis 200 m"
      ],
      "question_text_fa": "شما در این نقطه با خودروی خود دچار نقص فنی شده‌اید. در چه فاصله‌ای پشت خودروی خود مثلث هشدار را قرار می‌دهید؟",
      "answers_fa": [
          "تقریباً 150 متر تا 200 متر",
          "تقریباً 25 متر تا 50 متر",
          "تقریباً 250 متر تا 400 متر",
          "تقریباً 70 متر تا 100 متر"
      ],
      "correct_answer_fa": [
          "تقریباً 150 متر تا 200 متر"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2116",
      "question_text": "Sie fahren mit einem PKW. Wo werden Sie die Warnweste sinnvollerweise aufbewahren?",
      "answers": [
          "An einer Stelle im Fahrzeug, wo ich sie schnell zur Hand nehmen kann",
          "Im seitlichen Türfach oder im Handschuhfach",
          "Wenn vorhanden, im Netzfach auf der Rückseite des Fahrer- oder Beifahrersitzes",
          "Im Kofferraum"
      ],
      "correct_answers": [
          "An einer Stelle im Fahrzeug, wo ich sie schnell zur Hand nehmen kann",
          "Im seitlichen Türfach oder im Handschuhfach",
          "Wenn vorhanden, im Netzfach auf der Rückseite des Fahrer- oder Beifahrersitzes"
      ],
      "question_text_fa": "شما با خودروی خود در حال حرکت هستید. کجا بهتر است جلیقه هشدار را نگهداری کنید؟",
      "answers_fa": [
          "در مکانی در خودرو که بتوانم سریعاً به آن دسترسی پیدا کنم",
          "در محفظه درب جانبی یا در محفظه دستکش",
          "اگر موجود باشد، در محفظه مشبک پشت صندلی راننده یا صندلی جلو",
          "در صندوق عقب"
      ],
      "correct_answer_fa": [
          "در مکانی در خودرو که بتوانم سریعاً به آن دسترسی پیدا کنم",
          "در محفظه درب جانبی یا در محفظه دستکش",
          "اگر موجود باشد، در محفظه مشبک پشت صندلی راننده یا صندلی جلو"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2117",
      "question_text": "Wie viele Warnwesten müssen Sie in Ihrem PKW mitführen?",
      "answers": [
          "Mindestens eine",
          "Für jeden Sitzplatz eine",
          "Eine für jede mitfahrende Person",
          "Mindestens zwei"
      ],
      "correct_answers": [
          "Mindestens eine"
      ],
      "question_text_fa": "چند عدد جلیقه‌ی هشدار باید در خودروی شما وجود داشته باشد؟",
      "answers_fa": [
          "حداقل یک عدد",
          "برای هر صندلی یک عدد",
          "یک عدد برای هر شخص همراه",
          "حداقل دو عدد"
      ],
      "correct_answer_fa": [
          "حداقل یک عدد"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2118",
      "question_text": "Sie fahren mit Ihrem PKW. Wo werden Sie hier die Fahrspur wählen?",
      "answers": [
          "Rechts neben den Spurrinnen",
          "Links neben den Spurrinnen",
          "Zwischen den Spurrinnen",
          "In den Spurrinnen"
      ],
      "correct_answers": [
          "Rechts neben den Spurrinnen"
      ],
      "question_text_fa": "شما با خودروی خود در حال حرکت هستید. در اینجا کدام خط را انتخاب خواهید کرد؟",
      "answers_fa": [
          "در سمت راست کنار خطوط",
          "در سمت چپ کنار خطوط",
          "بین خطوط",
          "در خطوط"
      ],
      "correct_answer_fa": [
          "در سمت راست کنار خطوط"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2137",
      "question_text": "Sie fahren mit Ihrem PKW. Wie verhalten Sie sich, wenn Aquaplaning auftritt?",
      "answers": [
          "Ich werde vom Gas gehen und auskuppeln",
          "Ich werde stark bremsen",
          "Ich werde nach links oder rechts lenken",
          "Ich werde schnell zurückschalten"
      ],
      "correct_answers": [
          "Ich werde vom Gas gehen und auskuppeln"
      ],
      "question_text_fa": "شما با خودروی خود در حال حرکت هستید. وقتی که آکواپلنینگ رخ می‌دهد چه کار می‌کنید؟",
      "answers_fa": [
          "از گاز می‌روم و کلاچ می‌زنم",
          "به شدت ترمز می‌کنم",
          "به سمت چپ یا راست می‌چرخم",
          "سریعاً دنده را پایین می‌آورم"
      ],
      "correct_answer_fa": [
          "از گاز می‌روم و کلاچ می‌زنم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2188",
      "question_text": "Welche Aussage über Elektrofahrzeuge trifft zu?",
      "answers": [
          "Ein Elektrofahrzeug nützt die eingesetzte Energie wirtschaftlicher aus als ein Fahrzeug mit Verbrennungsmotor",
          "Ein Elektrofahrzeug erzeugt bei niedrigen Geschwindigkeiten weniger Lärm als ein Fahrzeug mit Verbrennungsmotor",
          "Ich darf mit einem Elektrofahrzeug nicht in eine Waschstraße fahren",
          "Elektrofahrzeuge erzeugen am Ort, an dem sie betrieben werden, kein Abgas"
      ],
      "correct_answers": [
          "Ein Elektrofahrzeug nützt die eingesetzte Energie wirtschaftlicher aus als ein Fahrzeug mit Verbrennungsmotor",
          "Ein Elektrofahrzeug erzeugt bei niedrigen Geschwindigkeiten weniger Lärm als ein Fahrzeug mit Verbrennungsmotor",
          "Elektrofahrzeuge erzeugen am Ort, an dem sie betrieben werden, kein Abgas"
      ],
      "question_text_fa": "کدام یک از جملات در مورد خودروهای الکتریکی صحیح است؟",
      "answers_fa": [
          "یک خودروی الکتریکی انرژی استفاده شده را به صرفه‌تر از یک خودروی با موتور احتراق استفاده می‌کند",
          "یک خودروی الکتریکی در سرعت‌های پایین کمتر صدا تولید می‌کند نسبت به یک خودروی با موتور احتراق",
          "من نمی‌توانم با یک خودروی الکتریکی به یک کارواش بروم",
          "خودروهای الکتریکی در محل کار خود هیچ گاز اگزوزی تولید نمی‌کنند"
      ],
      "correct_answer_fa": [
          "یک خودروی الکتریکی انرژی استفاده شده را به صرفه‌تر از یک خودروی با موتور احتراق استفاده می‌کند",
          "یک خودروی الکتریکی در سرعت‌های پایین کمتر صدا تولید می‌کند نسبت به یک خودروی با موتور احتراق",
          "خودروهای الکتریکی در محل کار خود هیچ گاز اگزوزی تولید نمی‌کنند"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2189",
      "question_text": "Was müssen Sie beim Betrieb von Elektrofahrzeugen beachten?",
      "answers": [
          "Bei niedriger Außentemperatur reduziert sich die mögliche Fahrtstrecke mit einer Akkuladung",
          "Je schneller mit einem Elektrofahrzeug gefahren wird, desto größer ist die mögliche Fahrtstrecke mit einer Akkuladung",
          "Die Reichweite eines Elektrofahrzeuges sinkt durch den Betrieb der Klimaanlage oder der Heizung",
          "Beim Laden des Akkus sind die Angaben der Betriebsanleitung des Elektrofahrzeuges zu beachten"
      ],
      "correct_answers": [
          "Bei niedriger Außentemperatur reduziert sich die mögliche Fahrtstrecke mit einer Akkuladung",
          "Die Reichweite eines Elektrofahrzeuges sinkt durch den Betrieb der Klimaanlage oder der Heizung",
          "Beim Laden des Akkus sind die Angaben der Betriebsanleitung des Elektrofahrzeuges zu beachten"
      ],
      "question_text_fa": "هنگام استفاده از خودروهای الکتریکی چه نکاتی باید رعایت کنید؟",
      "answers_fa": [
          "در دمای پایین بیرونی، فاصله‌ی ممکن با یک بار شارژ باتری کاهش می‌یابد",
          "هر چه با یک خودروی الکتریکی سریع‌تر رانده شود، فاصله‌ی ممکن با یک بار شارژ باتری بیشتر می‌شود",
          "محدوده یک خودروی الکتریکی به دلیل استفاده از تهویه مطبوع یا گرمایش کاهش می‌یابد",
          "هنگام شارژ باتری، باید اطلاعات دستورالعمل استفاده از خودروی الکتریکی رعایت شود"
      ],
      "correct_answer_fa": [
          "در دمای پایین بیرونی، فاصله‌ی ممکن با یک بار شارژ باتری کاهش می‌یابد",
          "محدوده یک خودروی الکتریکی به دلیل استفاده از تهویه مطبوع یا گرمایش کاهش می‌یابد",
          "هنگام شارژ باتری، باید اطلاعات دستورالعمل استفاده از خودروی الکتریکی رعایت شود"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2190",
      "question_text": "Welche Besonderheiten beachten Sie beim Fahren mit einem Elektrofahrzeug?",
      "answers": [
          "Ich rechne damit, dass Fußgänger mein Fahrzeug vor allem dann nicht hören, wenn ich langsam fahre",
          "Ich werde mich durch regelmäßiges Hupen bemerkbar machen, da Elektrofahrzeuge im Betrieb besonders leise sind",
          "Ich darf in alle Fußgängerzonen einfahren, da Elektrofahrzeuge keine schädlichen Abgase aussto\u0000ßen",
          "Ich kann schneller fahren als mit einem Verbrennungsmotor, da sich der Bremsweg durch die Rekuperation verkürzt"
      ],
      "correct_answers": [
          "Ich rechne damit, dass Fußgänger mein Fahrzeug vor allem dann nicht hören, wenn ich langsam fahre"
      ],
      "question_text_fa": "هنگام رانندگی با یک خودروی الکتریکی به چه نکات خاصی توجه می‌کنید؟",
      "answers_fa": [
          "من انتظار دارم که عابرین به ویژه زمانی که آهسته رانندگی می‌کنم صدای خودروی من را نشنوند",
          "من با بوق زدن منظم خود را به نمایش می‌گذارم، زیرا خودروهای الکتریکی در حال کار به ویژه کم صدا هستند",
          "من می‌توانم به تمام مناطق عابرین وارد شوم، زیرا خودروهای الکتریکی هیچ گاز مضری تولید نمی‌کنند",
          "من می‌توانم سریع‌تر از خودروی با موتور احتراق بروم، زیرا فاصله ترمز با استفاده از بازگشت انرژی کاهش می‌یابد"
      ],
      "correct_answer_fa": [
          "من انتظار دارم که عابرین به ویژه زمانی که آهسته رانندگی می‌کنم صدای خودروی من را نشنوند"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2191",
      "question_text": "Warum ist ein Elektrofahrzeug beim langsamen Fahren leiser als ein Fahrzeug mit Verbrennungsmotor?",
      "answers": [
          "Ein Elektromotor ist im Betrieb deutlich leiser",
          "Die Motorhaube bei Elektrofahrzeugen ist besonders gut schallisoliert",
          "Lärmarme Reifen sind nur für Elektrofahrzeuge erhältlich",
          "Elektrofahrzeuge entwickeln weniger Windgeräusche als Fahrzeuge mit Verbrennungsmotoren"
      ],
      "correct_answers": [
          "Ein Elektromotor ist im Betrieb deutlich leiser"
      ],
      "question_text_fa": "چرا یک خودروی الکتریکی در حال حرکت آرام، از یک خودروی با موتور احتراق quieter است؟",
      "answers_fa": [
          "یک موتور الکتریکی در حال کار به طور قابل توجهی کم صدا است",
          "کاپوت خودروهای الکتریکی به خصوص خوب عایق صدا است",
          "تایرهای کم‌صدا تنها برای خودروهای الکتریکی در دسترس هستند",
          "خودروهای الکتریکی کمتر از خودروهای با موتور احتراق صداهای وزش باد تولید می‌کنند"
      ],
      "correct_answer_fa": [
          "یک موتور الکتریکی در حال کار به طور قابل توجهی کم صدا است"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2196",
      "question_text": "Welche Vorteile bieten Elektrofahrzeuge gegenüber Fahrzeugen mit Verbrennungsmotoren?",
      "answers": [
          "Elektrofahrzeuge sind in der Anschaffung billiger",
          "Elektrofahrzeuge haben günstigere Energiekosten",
          "Elektrofahrzeuge haben geringere Wartungskosten",
          "Elektrofahrzeuge weisen pro gefahrenem Kilometer weniger Kohlendioxid-Emissionen auf, wenn Öko-Strom getankt wird"
      ],
      "correct_answers": [
          "Elektrofahrzeuge haben günstigere Energiekosten",
          "Elektrofahrzeuge haben geringere Wartungskosten",
          "Elektrofahrzeuge weisen pro gefahrenem Kilometer weniger Kohlendioxid-Emissionen auf, wenn Öko-Strom getankt wird"
      ],
      "question_text_fa": "چه مزایایی خودروهای الکتریکی نسبت به خودروهای با موتور احتراق دارند؟",
      "answers_fa": [
          "خودروهای الکتریکی در خرید ارزان‌تر هستند",
          "خودروهای الکتریکی هزینه‌های انرژی کمتری دارند",
          "خودروهای الکتریکی هزینه‌های نگهداری کمتری دارند",
          "خودروهای الکتریکی در هر کیلومتر کمتری دی‌اکسید کربن تولید می‌کنند، اگر برق سبز استفاده شود"
      ],
      "correct_answer_fa": [
          "خودروهای الکتریکی هزینه‌های انرژی کمتری دارند",
          "خودروهای الکتریکی هزینه‌های نگهداری کمتری دارند",
          "خودروهای الکتریکی در هر کیلومتر کمتری دی‌اکسید کربن تولید می‌کنند، اگر برق سبز استفاده شود"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2197",
      "question_text": "Was müssen Sie beachten, wenn Sie den Akku eines Elektrofahrzeuges aufladen wollen?",
      "answers": [
          "Der Steckertyp der Ladestation muss zu meinem Ladekabel bzw. zu meinem Elektrofahrzeug passen",
          "Akkus dürfen erst dann wieder aufgeladen werden, wenn sie zuvor tiefentladen wurden",
          "Es können beliebige Verlängerungskabel verwendet werden, falls dies erforderlich ist",
          "Schnellladevorgänge erhöhen die Lebensdauer des Akkus"
      ],
      "correct_answers": [
          "Der Steckertyp der Ladestation muss zu meinem Ladekabel bzw. zu meinem Elektrofahrzeug passen"
      ],
      "question_text_fa": "هنگام شارژ باتری یک خودروی الکتریکی چه نکاتی را باید رعایت کنید؟",
      "answers_fa": [
          "نوع پریز ایستگاه شارژ باید با کابل شارژ من و یا خودروی الکتریکی من سازگار باشد",
          "باتری‌ها تنها زمانی باید دوباره شارژ شوند که قبلاً عمیق تخلیه شده باشند",
          "در صورت نیاز، می‌توان از هر نوع کابل افزایشی استفاده کرد",
          "فرآیندهای شارژ سریع عمر باتری را افزایش می‌دهند"
      ],
      "correct_answer_fa": [
          "نوع پریز ایستگاه شارژ باید با کابل شارژ من و یا خودروی الکتریکی من سازگار باشد"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2440",
      "question_text": "Sie fahren auf einer Autobahn. Wie werden Sie sich in dieser Situation verhalten?",
      "answers": [
          "Ich werde auf den Pannenstreifen fahren, um eine Rettungsgasse zu bilden",
          "Ich werde anhalten und mein Pannendreieck in der Entfernung des Anhalteweges aufstellen",
          "Ich werde mit möglichst großem Seitenabstand an der Unfallstelle vorbeifahren",
          "Ich werde besonders auf die Personen der Einsatzorganisationen achten"
      ],
      "correct_answers": [
          "Ich werde mit möglichst großem Seitenabstand an der Unfallstelle vorbeifahren",
          "Ich werde besonders auf die Personen der Einsatzorganisationen achten"
      ],
      "question_text_fa": "شما در حال حرکت در بزرگراه هستید. در این موقعیت چگونه رفتار خواهید کرد؟",
      "answers_fa": [
          "من به نوار پناهگاه می‌روم تا یک حفره نجات ایجاد کنم",
          "من توقف می‌کنم و مثل فاصله‌ی توقف، علامت حریق را قرار می‌دهم",
          "من با حداکثر فاصله جانبی ممکن از محل تصادف عبور می‌کنم",
          "من به ویژه به افراد سازمان‌های خدماتی توجه می‌کنم"
      ],
      "correct_answer_fa": [
          "من با حداکثر فاصله جانبی ممکن از محل تصادف عبور می‌کنم",
          "من به ویژه به افراد سازمان‌های خدماتی توجه می‌کنم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2441",
      "question_text": "Mit welchen möglichen Gefahren rechnen Sie in dieser Situation?",
      "answers": [
          "Der Fahrzeuglenker vor mir könnte durch die Unfallsituation abgelenkt sein und zu spät reagieren, wenn die Kolonne langsamer wird",
          "Der Fahrzeuglenker hinter mir könnte durch die Unfallsituation abgelenkt sein und zu spät reagieren, wenn die Kolonne langsamer wird",
          "Personen der Einsatzorganisationen könnten plötzlich hinter den verunfallten Fahrzeugen hervortreten",
          "Personen der Einsatzorganisationen könnten wegen der rutschigen Fahrbahn das Gleichgewicht verlieren"
      ],
      "correct_answers": [
          "Der Fahrzeuglenker vor mir könnte durch die Unfallsituation abgelenkt sein und zu spät reagieren, wenn die Kolonne langsamer wird",
          "Der Fahrzeuglenker hinter mir könnte durch die Unfallsituation abgelenkt sein und zu spät reagieren, wenn die Kolonne langsamer wird",
          "Personen der Einsatzorganisationen könnten plötzlich hinter den verunfallten Fahrzeugen hervortreten",
          "Personen der Einsatzorganisationen könnten wegen der rutschigen Fahrbahn das Gleichgewicht verlieren"
      ],
      "question_text_fa": "در این موقعیت با چه خطرات احتمالی مواجه هستید؟",
      "answers_fa": [
          "راننده‌ی خودرو جلوی من ممکن است به دلیل وضعیت تصادف حواسش پرت شود و وقتی که صف کند می‌شود دیرتر واکنش نشان دهد",
          "راننده‌ی خودرو پشت سر من ممکن است به دلیل وضعیت تصادف حواسش پرت شود و وقتی که صف کند می‌شود دیرتر واکنش نشان دهد",
          "افراد سازمان‌های خدماتی ممکن است ناگهان از پشت خودروهای تصادفی بیرون بیایند",
          "افراد سازمان‌های خدماتی ممکن است به دلیل سطح لغزنده تعادل خود را از دست بدهند"
      ],
      "correct_answer_fa": [
          "راننده‌ی خودرو جلوی من ممکن است به دلیل وضعیت تصادف حواسش پرت شود و وقتی که صف کند می‌شود دیرتر واکنش نشان دهد",
          "راننده‌ی خودرو پشت سر من ممکن است به دلیل وضعیت تصادف حواسش پرت شود و وقتی که صف کند می‌شود دیرتر واکنش نشان دهد",
          "افراد سازمان‌های خدماتی ممکن است ناگهان از پشت خودروهای تصادفی بیرون بیایند",
          "افراد سازمان‌های خدماتی ممکن است به دلیل سطح لغزنده تعادل خود را از دست بدهند"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2475",
      "question_text": "Sie nähern sich dieser Kreuzung mit etwa 20 km/h und wollen nach rechts einbiegen. Haben Sie Wartepflicht oder Vorrang?",
      "answers": [
          "Ich habe Wartepflicht gegenüber der Radfahrerin auf dem Mehrzweckstreifen",
          "Ich habe Vorrang gegenüber der Radfahrerin, weil der Mehrzweckstreifen hier endet",
          "Ich habe Vorrang gegenüber der Radfahrerin, weil ich nach rechts einbiege",
          "Ich habe Vorrang gegenüber der Radfahrerin, da keine Radfahrerüberfahrt markiert ist"
      ],
      "correct_answers": [
          "Ich habe Wartepflicht gegenüber der Radfahrerin auf dem Mehrzweckstreifen"
      ],
      "question_text_fa": "شما به این تقاطع با سرعت حدود ۲۰ کیلومتر در ساعت نزدیک می‌شوید و می‌خواهید به سمت راست بپیچید. آیا شما باید منتظر بمانید یا حق تقدم دارید؟",
      "answers_fa": [
          "من باید به دوچرخه‌سوار در نوار چندمنظوره حق تقدم بدهم",
          "من حق تقدم دارم نسبت به دوچرخه‌سوار، زیرا نوار چندمنظوره در اینجا به پایان می‌رسد",
          "من حق تقدم دارم نسبت به دوچرخه‌سوار، زیرا به سمت راست می‌پیچم",
          "من حق تقدم دارم نسبت به دوچرخه‌سوار، چون هیچ گذرگاه دوچرخه‌ای علامت‌گذاری نشده است"
      ],
      "correct_answer_fa": [
          "من باید به دوچرخه‌سوار در نوار چندمنظوره حق تقدم بدهم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2476",
      "question_text": "Sie wollen bei dieser Kreuzung nach rechts einbiegen. Wie verhalten Sie sich?",
      "answers": [
          "Ich nähere mich bremsend, schaue in den rechten Rückspiegel und über die rechte Schulter",
          "Ich schalte den rechten Blinker ein und beobachte das Verhalten der Radfahrerin",
          "Ich werde nicht einbiegen, falls ich dadurch die Radfahrerin behindern könnte",
          "Ich schalte den rechten Blinker möglichst frühzeitig ein, damit die Radfahrerin genügend Zeit zum Abbremsen hat"
      ],
      "correct_answers": [
          "Ich nähere mich bremsend, schaue in den rechten Rückspiegel und über die rechte Schulter",
          "Ich schalte den rechten Blinker ein und beobachte das Verhalten der Radfahrerin",
          "Ich werde nicht einbiegen, falls ich dadurch die Radfahrerin behindern könnte"
      ],
      "question_text_fa": "شما می‌خواهید در این تقاطع به سمت راست بپیچید. چگونه رفتار خواهید کرد؟",
      "answers_fa": [
          "من به آرامی نزدیک می‌شوم، به آینه راست نگاه می‌کنم و به شانه راست می‌چرخم",
          "من چراغ راهنمای راست را روشن می‌کنم و رفتار دوچرخه‌سوار را زیر نظر دارم",
          "من نمی‌پیچم اگر این کار دوچرخه‌سوار را مختل کند",
          "من چراغ راهنمای راست را هرچه زودتر روشن می‌کنم تا دوچرخه‌سوار وقت کافی برای ترمز کردن داشته باشد"
      ],
      "correct_answer_fa": [
          "من به آرامی نزدیک می‌شوم، به آینه راست نگاه می‌کنم و به شانه راست می‌چرخم",
          "من چراغ راهنمای راست را روشن می‌کنم و رفتار دوچرخه‌سوار را زیر نظر دارم",
          "من نمی‌پیچم اگر این کار دوچرخه‌سوار را مختل کند"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2538",
      "question_text": "Sie fahren mit einem Kleintransporter. Wie werden Sie sich in dieser Situation verhalten?",
      "answers": [
          "Ich werde schon während der Annäherung an die Engstelle den linken Blinker einschalten",
          "Weil ich beim Vorbeifahren den Gegenverkehr behindern könnte, werde ich frühzeitig anhalten",
          "Ich gebe dem Gegenverkehr ein Handzeichen, damit er auf den Gehsteig ausweicht",
          "Ich werde eine abrupte Bremsung einleiten, falls der Gegenverkehr auf seinem Vorrang beharrt"
      ],
      "correct_answers": [
          "Ich werde schon während der Annäherung an die Engstelle den linken Blinker einschalten",
          "Weil ich beim Vorbeifahren den Gegenverkehr behindern könnte, werde ich frühzeitig anhalten"
      ],
      "question_text_fa": "شما با یک خودروی ون در حال رانندگی هستید. در این وضعیت چگونه رفتار خواهید کرد؟",
      "answers_fa": [
          "من حتی در حین نزدیک شدن به تنگه چراغ راهنمای چپ را روشن می‌کنم",
          "چون ممکن است در حین عبور از جلوی خودروهای مخالف مزاحمت ایجاد کنم، زودتر توقف می‌کنم",
          "من به ترافیک مخالف علامت می‌زنم تا به پیاده‌رو منحرف شود",
          "اگر ترافیک مخالف بر حق تقدم خود پافشاری کند، من ناگهان ترمز می‌زنم"
      ],
      "correct_answer_fa": [
          "من حتی در حین نزدیک شدن به تنگه چراغ راهنمای چپ را روشن می‌کنم",
          "چون ممکن است در حین عبور از جلوی خودروهای مخالف مزاحمت ایجاد کنم، زودتر توقف می‌کنم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2539",
      "question_text": "Sie fahren mit einem Kleintransporter. Warum müssen Sie in dieser Situation schon bei der Annäherung an diese Situation links blinken?",
      "answers": [
          "Weil der Gegenverkehr warten muss, sobald ich den Blinker verwende",
          "Weil mein Nachfolgeverkehr durch den hohen Aufbau meines Fahrzeuges die Verkehrssituation nicht erkennen kann",
          "Weil die nachfolgenden Fahrzeuglenker sonst zum Überholen verleitet sein könnten, wenn ich abbremse",
          "Weil ich jeden beabsichtigten Fahrstreifenwechsel rechtzeitig ankündigen muss"
      ],
      "correct_answers": [
          "Weil mein Nachfolgeverkehr durch den hohen Aufbau meines Fahrzeuges die Verkehrssituation nicht erkennen kann",
          "Weil die nachfolgenden Fahrzeuglenker sonst zum Überholen verleitet sein könnten, wenn ich abbremse",
          "Weil ich jeden beabsichtigten Fahrstreifenwechsel rechtzeitig ankündigen muss"
      ],
      "question_text_fa": "شما با یک خودروی ون در حال رانندگی هستید. چرا باید در این وضعیت در حین نزدیک شدن به این وضعیت چراغ راهنمای چپ را روشن کنید؟",
      "answers_fa": [
          "چون ترافیک مخالف باید صبر کند به محض اینکه چراغ را روشن کنم",
          "چون ترافیک پشت سر من به خاطر ارتفاع بالای خودروی من نمی‌تواند وضعیت ترافیک را تشخیص دهد",
          "چون رانندگان خودروهای بعدی ممکن است به خاطر ترمز من وسوسه شوند که سبقت بگیرند",
          "چون من باید هرگونه تغییر لاین را به موقع اعلام کنم"
      ],
      "correct_answer_fa": [
          "چون ترافیک پشت سر من به خاطر ارتفاع بالای خودروی من نمی‌تواند وضعیت ترافیک را تشخیص دهد",
          "چون رانندگان خودروهای بعدی ممکن است به خاطر ترمز من وسوسه شوند که سبقت بگیرند",
          "چون من باید هرگونه تغییر لاین را به موقع اعلام کنم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2732",
      "question_text": "Sie fahren hier mit einem Elektrofahrzeug. Was beachten Sie dabei?",
      "answers": [
          "Ich wähle vor der Gefällestrecke die Segelstellung der Kraftübertragung",
          "Ich schalte die Rekuperation vor der Gefällestrecke auf eine hohe Stufe",
          "Ich betätige im Gefälle das Fußbremspedal, falls ich dadurch bei meinem Fahrzeug die Rekuperation verstärke",
          "Ich stelle vor der Gefällestrecke den Wählhebel der Kraftübertragung auf \"N\""
      ],
      "correct_answers": [
          "Ich schalte die Rekuperation vor der Gefällestrecke auf eine hohe Stufe",
          "Ich betätige im Gefälle das Fußbremspedal, falls ich dadurch bei meinem Fahrzeug die Rekuperation verstärke"
      ],
      "question_text_fa": "شما با یک خودروی الکتریکی در حال رانندگی هستید. چه نکاتی را باید در نظر بگیرید؟",
      "answers_fa": [
          "قبل از شیب، وضعیت انتقال قدرت را به حالت دریفت انتخاب می‌کنم",
          "قبل از شیب، بازیابی را بر روی یک سطح بالا تنظیم می‌کنم",
          "در شیب، پدال ترمز را فشار می‌زنم، اگر این کار باعث افزایش بازیابی در خودروی من شود",
          "قبل از شیب، اهرم انتخاب قدرت را روی \"N\" قرار می‌دهم"
      ],
      "correct_answer_fa": [
          "قبل از شیب، بازیابی را بر روی یک سطح بالا تنظیم می‌کنم",
          "در شیب، پدال ترمز را فشار می‌زنم، اگر این کار باعث افزایش بازیابی در خودروی من شود"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2733",
      "question_text": "Sie fahren hier mit einem Elektrofahrzeug. Woran erkennen Sie im Gefälle, dass die richtige Rekuperationsstufe gewählt wurde?",
      "answers": [
          "Daran, dass die Geschwindigkeit nicht ansteigt",
          "Daran, dass ich das Fahrpedal nicht betätigen muss",
          "Daran, dass der Akku für den Antriebsmotor nicht aufgeladen wird",
          "Daran, dass das Warnlicht für den Ladestrom aufleuchtet"
      ],
      "correct_answers": [
          "Daran, dass die Geschwindigkeit nicht ansteigt",
          "Daran, dass ich das Fahrpedal nicht betätigen muss"
      ],
      "question_text_fa": "شما با یک خودروی الکتریکی در حال رانندگی هستید. چگونه می‌توانید در شیب بفهمید که سطح بازیابی مناسبی انتخاب شده است؟",
      "answers_fa": [
          "از این که سرعت افزایش نمی‌یابد",
          "از این که نیازی به فشار دادن پدال گاز ندارم",
          "از این که باتری برای موتور محرک شارژ نمی‌شود",
          "از این که چراغ هشدار برای جریان شارژ روشن می‌شود"
      ],
      "correct_answer_fa": [
          "از این که سرعت افزایش نمی‌یابد",
          "از این که نیازی به فشار دادن پدال گاز ندارم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2734",
      "question_text": "Sie fahren hier mit einem Elektrofahrzeug. Was beachten Sie dabei?",
      "answers": [
          "Ich wähle vor der Gefällestrecke die Segelstellung der Kraftübertragung",
          "Ich stelle vor der Gefällestrecke den Wählhebel der Kraftübertragung auf \"N\"",
          "Ich schalte vor der Gefällestrecke die Rekuperation auf die passende Stufe",
          "Ich betätige im Gefälle das Fußbremspedal, falls ich dadurch bei meinem Fahrzeug die Rekuperation verstärke"
      ],
      "correct_answers": [
          "Ich schalte vor der Gefällestrecke die Rekuperation auf die passende Stufe",
          "Ich betätige im Gefälle das Fußbremspedal, falls ich dadurch bei meinem Fahrzeug die Rekuperation verstärke"
      ],
      "question_text_fa": "شما با یک خودروی الکتریکی در حال رانندگی هستید. چه نکاتی را باید در نظر بگیرید؟",
      "answers_fa": [
          "قبل از شیب، وضعیت انتقال قدرت را به حالت دریفت انتخاب می‌کنم",
          "قبل از شیب، اهرم انتخاب قدرت را روی \"N\" قرار می‌دهم",
          "قبل از شیب، بازیابی را بر روی سطح مناسب تنظیم می‌کنم",
          "در شیب، پدال ترمز را فشار می‌زنم، اگر این کار باعث افزایش بازیابی در خودروی من شود"
      ],
      "correct_answer_fa": [
          "قبل از شیب، بازیابی را بر روی سطح مناسب تنظیم می‌کنم",
          "در شیب، پدال ترمز را فشار می‌زنم، اگر این کار باعث افزایش بازیابی در خودروی من شود"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2735",
      "question_text": "Sie fahren hier mit einem Elektrofahrzeug. Der Akku des Fahrzeuges ist voll aufgeladen. Mit welchen Problemen müssen Sie dann rechnen?",
      "answers": [
          "Die Rekuperation wirkt nicht",
          "Wenn die Rekuperation nicht wirkt, muss die Geschwindigkeit mit der Fußbremse reguliert werden",
          "Der Akku könnte überladen werden",
          "Der Motor könnte abbrennen"
      ],
      "correct_answers": [
          "Die Rekuperation wirkt nicht",
          "Wenn die Rekuperation nicht wirkt, muss die Geschwindigkeit mit der Fußbremse reguliert werden"
      ],
      "question_text_fa": "شما با یک خودروی الکتریکی در حال رانندگی هستید. باتری خودروی شما به طور کامل شارژ شده است. با چه مشکلاتی باید انتظار داشته باشید؟",
      "answers_fa": [
          "بازیابی کار نمی‌کند",
          "اگر بازیابی کار نکند، باید سرعت را با ترمز پایی تنظیم کنم",
          "باتری ممکن است بیش از حد شارژ شود",
          "موتور ممکن است بسوزد"
      ],
      "correct_answer_fa": [
          "بازیابی کار نمی‌کند",
          "اگر بازیابی کار نکند، باید سرعت را با ترمز پایی تنظیم کنم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  
  
  {
      "question_number": "2738",
      "question_text": "Wie können Sie mit einem Elektrofahrzeug sparsam und umweltfreundlich fahren?",
      "answers": [
          "Ich vermeide es, unnötiges Gewicht mitzuführen",
          "Ich vermeide die Stoßzeiten, da durch das Stop & Go Fahren der Verbrauch steigt",
          "Ich beschleunige so oft wie möglich mit voller Leistung",
          "Ich versuche, wenn möglich, nur mit der Rekuperation zu bremsen"
      ],
      "correct_answers": [
          "Ich vermeide es, unnötiges Gewicht mitzuführen",
          "Ich vermeide die Stoßzeiten, da durch das Stop & Go Fahren der Verbrauch steigt",
          "Ich versuche, wenn möglich, nur mit der Rekuperation zu bremsen"
      ],
      "question_text_fa": "چگونه می‌توانید با یک خودروی الکتریکی به طور صرفه‌جو و دوستدار محیط زیست رانندگی کنید؟",
      "answers_fa": [
          "من از حمل وزن اضافی اجتناب می‌کنم",
          "من از ساعات اوج ترافیک اجتناب می‌کنم زیرا در این زمان مصرف افزایش می‌یابد",
          "من تا حد ممکن با حداکثر توان شتاب می‌گیرم",
          "من سعی می‌کنم اگر ممکن باشد تنها با بازگشت انرژی ترمز کنم"
      ],
      "correct_answer_fa": [
          "من از حمل وزن اضافی اجتناب می‌کنم",
          "من از ساعات اوج ترافیک اجتناب می‌کنم زیرا در این زمان مصرف افزایش می‌یابد",
          "من سعی می‌کنم اگر ممکن باشد تنها با بازگشت انرژی ترمز کنم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2739",
      "question_text": "Was kennzeichnet einen Strom sparenden und sicheren Fahrstil?",
      "answers": [
          "Ich fahre gelassen und vorausschauend",
          "Ich halte beim Hintereinanderfahren mindestens 2 bis 3 Sekunden Abstand, um den Schwung besser nutzen zu können",
          "Ich fahre im Windschatten des vor mir fahrenden Fahrzeugs",
          "Ich werde Gefällestrecken ohne Rekuperation fahren, um den Akku nicht zu überladen"
      ],
      "correct_answers": [
          "Ich fahre gelassen und vorausschauend",
          "Ich halte beim Hintereinanderfahren mindestens 2 bis 3 Sekunden Abstand, um den Schwung besser nutzen zu können"
      ],
      "question_text_fa": "یک سبک رانندگی صرفه‌جو و ایمن چه ویژگی‌هایی دارد؟",
      "answers_fa": [
          "من آرام و با پیش‌بینی می‌روم",
          "در هنگام رانندگی از فاصله حداقل 2 تا 3 ثانیه‌ای برخوردار می‌شوم تا بتوانم از شتاب بهتر استفاده کنم",
          "من در سایه باد خودروی جلویی می‌روم",
          "من شیب‌ها را بدون بازگشت انرژی می‌روم تا باتری بیش از حد شارژ نشود"
      ],
      "correct_answer_fa": [
          "من آرام و با پیش‌بینی می‌روم",
          "در هنگام رانندگی از فاصله حداقل 2 تا 3 ثانیه‌ای برخوردار می‌شوم تا بتوانم از شتاب بهتر استفاده کنم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2742",
      "question_text": "Welche Gefahren könnten entstehen, wenn Sie mit einem Elektrofahrzeug fahren?",
      "answers": [
          "Fußgänger und Radfahrer hören mich nicht, wenn ich langsam fahre",
          "Da ich niemals zu einer normalen Tankstelle muss, vergesse ich, den Reifendruck zu kontrollieren",
          "Wenn ich den Akku voll lade, könnte dieser explodieren",
          "Ich könnte einen Stromschlag bekommen, wenn ich das Ladekabel während des Ladens anfasse"
      ],
      "correct_answers": [
          "Fußgänger und Radfahrer hören mich nicht, wenn ich langsam fahre",
          "Da ich niemals zu einer normalen Tankstelle muss, vergesse ich, den Reifendruck zu kontrollieren"
      ],
      "question_text_fa": "چه خطراتی ممکن است در هنگام رانندگی با یک خودروی الکتریکی به وجود بیاید؟",
      "answers_fa": [
          "پیاده‌ها و دوچرخه‌سواران وقتی به آرامی حرکت می‌کنم مرا نمی‌شنوند",
          "چون هرگز به یک جایگاه سوخت معمولی نمی‌روم، فراموش می‌کنم که فشار تایر را بررسی کنم",
          "اگر باتری را کاملاً شارژ کنم، ممکن است منفجر شود",
          "اگر کابل شارژ را حین شارژ لمس کنم، ممکن است شوک الکتریکی بزنم"
      ],
      "correct_answer_fa": [
          "پیاده‌ها و دوچرخه‌سواران وقتی به آرامی حرکت می‌کنم مرا نمی‌شنوند",
          "چون هرگز به یک جایگاه سوخت معمولی نمی‌روم، فراموش می‌کنم که فشار تایر را بررسی کنم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2743",
      "question_text": "Sie fahren mit einem Elektrofahrzeug auf dem Parkplatz eines Einkaufszentrums. Wie werden Sie sich dabei verhalten?",
      "answers": [
          "Beim Verlassen meiner Parklücke achte Ich besonders auf Fußgänger, da das stehende Elektrofahrzeug kein Geräusch produziert",
          "Ich werde bei geöffnetem Seitenfenster laute Musik spielen, um gehört zu werden",
          "Ich werde besonders langsam und vorsichtig fahren",
          "Ich werde ständig hupen, um andere Personen auf mich aufmerksam zu machen"
      ],
      "correct_answers": [
          "Beim Verlassen meiner Parklücke achte Ich besonders auf Fußgänger, da das stehende Elektrofahrzeug kein Geräusch produziert",
          "Ich werde besonders langsam und vorsichtig fahren"
      ],
      "question_text_fa": "شما با یک خودروی الکتریکی در پارکینگ یک مرکز خرید در حال رانندگی هستید. چگونه رفتار خواهید کرد؟",
      "answers_fa": [
          "هنگام ترک جای پارک، به‌ویژه به پیاده‌ها توجه می‌کنم زیرا خودروی الکتریکی ایستاده صدایی تولید نمی‌کند",
          "من با پنجره کناری باز، موسیقی بلندی پخش می‌کنم تا شنیده شوم",
          "من به‌ویژه با احتیاط و به آرامی رانندگی می‌کنم",
          "من دائماً بوق می‌زنم تا دیگران مرا ببینند"
      ],
      "correct_answer_fa": [
          "هنگام ترک جای پارک، به‌ویژه به پیاده‌ها توجه می‌کنم زیرا خودروی الکتریکی ایستاده صدایی تولید نمی‌کند",
          "من به‌ویژه با احتیاط و به آرامی رانندگی می‌کنم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "2744",
      "category": "B - Gefahrenlehre, Antriebe, Pannen",
      "question_text": "Sie fahren mit einem Elektrofahrzeug. Was werden Sie beachten, wenn Sie überholen wollen?",
      "answers": [
          "Ich deaktiviere den ECO-Modus, falls dieser bei meinem Fahrzeug die erreichbare Fahrgeschwindigkeit begrenzt.",
          "Ich schalte dazu den ECO-Modus ein.",
          "Ich nütze zum Überholen die volle Beschleunigungsleistung, um einen kurzen Überholweg zu erreichen.",
          "Wenn der Akku voll ist, rechne ich damit, dass die Beschleunigungsleistung geringer ist."
      ],
      "correct_answers": [
          "Ich deaktiviere den ECO-Modus, falls dieser bei meinem Fahrzeug die erreichbare Fahrgeschwindigkeit begrenzt.",
          "Ich nütze zum Überholen die volle Beschleunigungsleistung, um einen kurzen Überholweg zu erreichen."
      ],
      "question_text_fa": "شما با یک خودروی الکتریکی رانندگی می‌کنید. هنگام انجام overtaking باید به چه نکاتی توجه کنید؟",
      "answers_fa": [
          "در صورتی که حالت ECO در خودروی من سرعت قابل دستیابی را محدود کند، آن را غیرفعال می‌کنم.",
          "برای این کار حالت ECO را فعال می‌کنم.",
          "برای overtaking از تمام توان شتاب‌گیری استفاده می‌کنم تا فاصله overtaking کوتاهتر شود.",
          "وقتی باتری پر است، فرض می‌کنم که توان شتاب‌گیری کمتر است."
      ],
      "correct_answers_fa": [
          "در صورتی که حالت ECO در خودروی من سرعت قابل دستیابی را محدود کند، آن را غیرفعال می‌کنم.",
          "برای overtaking از تمام توان شتاب‌گیری استفاده می‌کنم تا فاصله overtaking کوتاهتر شود."
      ]
  }
  ,
  {
      "question_number": "2745",
      "category": "B - Gefahrenlehre, Antriebe, Pannen",
      "question_text": "Sie fahren mit einem Elektrofahrzeug. Warum werden Sie den ECO-Modus deaktivieren, wenn Sie überholen möchten?",
      "answers": [
          "Um zu vermeiden, dass beim starken Beschleunigen der Elektromotor beschädigt wird.",
          "Der ECO-Modus könnte die erreichbare Fahrgeschwindigkeit limitieren.",
          "Um Strom zu sparen.",
          "Um zu vermeiden, dass beim starken Beschleunigen der Akku beschädigt wird."
      ],
      "correct_answers": [
          "Der ECO-Modus könnte die erreichbare Fahrgeschwindigkeit limitieren."
      ],
      "question_text_fa": "شما با یک خودروی الکتریکی رانندگی می‌کنید. چرا وقتی می‌خواهید overtaking کنید، حالت ECO را غیرفعال می‌کنید؟",
      "answers_fa": [
          "برای جلوگیری از آسیب به موتور الکتریکی در هنگام شتاب‌گیری شدید.",
          "حالت ECO ممکن است سرعت قابل دستیابی را محدود کند.",
          "برای صرفه‌جویی در مصرف برق.",
          "برای جلوگیری از آسیب به باتری در هنگام شتاب‌گیری شدید."
      ],
      "correct_answers_fa": [
          "حالت ECO ممکن است سرعت قابل دستیابی را محدود کند."
      ]
  }
  ,
  {
      "question_number": "2746",
      "question_text": "Sie möchten mit Ihrem Elektrofahrzeug eine Strecke fahren, die über der möglichen Reichweite Ihres Fahrzeuges liegt. Was werden Sie beachten?",
      "answers": [
          "Ich informiere mich über Ladestationen auf meiner Strecke, die für die mein Fahrzeug geeignet sind",
          "Ich fahre möglichst schnell, um früher zu einer Schnellladestation zu kommen",
          "Ich werde den Akku voll laden. Erforderlichenfalls stelle ich dies am Fahrzeug ein",
          "Ich werde die Reichweitenprognose am Armaturenbrett beobachten und erforderlichenfalls langsamer fahren"
      ],
      "correct_answers": [
          "Ich informiere mich über Ladestationen auf meiner Strecke, die für die mein Fahrzeug geeignet sind",
          "Ich werde den Akku voll laden. Erforderlichenfalls stelle ich dies am Fahrzeug ein",
          "Ich werde die Reichweitenprognose am Armaturenbrett beobachten und erforderlichenfalls langsamer fahren"
      ],
      "question_text_fa": "شما می‌خواهید با خودروی الکتریکی خود مسیری را طی کنید که از حداکثر برد خودرو شما بیشتر است. چه نکاتی را باید در نظر بگیرید؟",
      "answers_fa": [
          "من در مورد ایستگاه‌های شارژ در مسیرم که برای خودروی من مناسب هستند، اطلاعات جمع‌آوری می‌کنم",
          "من تا حد ممکن سریع می‌روم تا زودتر به ایستگاه شارژ سریع برسم",
          "من باتری را کاملاً شارژ می‌کنم. در صورت نیاز این را بر روی خودرو تنظیم می‌کنم",
          "من پیش‌بینی برد را بر روی صفحه داشبورد بررسی می‌کنم و در صورت لزوم با سرعت کمتری رانندگی می‌کنم"
      ],
      "correct_answer_fa": [
          "من در مورد ایستگاه‌های شارژ در مسیرم که برای خودروی من مناسب هستند، اطلاعات جمع‌آوری می‌کنم",
          "من باتری را کاملاً شارژ می‌کنم. در صورت نیاز این را بر روی خودرو تنظیم می‌کنم",
          "من پیش‌بینی برد را بر روی صفحه داشبورد بررسی می‌کنم و در صورت لزوم با سرعت کمتری رانندگی می‌کنم"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "2747",
      "question_text": "Sie möchten mit Ihrem Elektrofahrzeug eine längere Strecke fahren. Was können Sie tun, wenn Sie erkennen, dass die Rest-Reichweite nicht ausreicht, um an Ihr geplantes Ziel bzw. zur geplanten Ladestation zu kommen?",
      "answers": [
          "Ich fahre langsamer",
          "Ich suche eine näher gelegene Ladestation",
          "Ich schalte die Heizung oder die Klimaanlage aus",
          "Ich schalte die Beleuchtung und die Rekuperation aus"
      ],
      "correct_answers": [
          "Ich fahre langsamer",
          "Ich suche eine näher gelegene Ladestation",
          "Ich schalte die Heizung oder die Klimaanlage aus"
      ],
      "question_text_fa": "شما می‌خواهید با خودروی الکتریکی خود مسافت طولانی‌تری را طی کنید. اگر متوجه شوید که مسافت باقی‌مانده کافی نیست تا به مقصد مورد نظر یا ایستگاه شارژ برسید، چه می‌توانید بکنید؟",
      "answers_fa": [
          "من کندتر می‌روم",
          "من به دنبال یک ایستگاه شارژ نزدیک‌تر می‌گردم",
          "من سیستم گرمایش یا تهویه مطبوع را خاموش می‌کنم",
          "من روشنایی و بازگشت انرژی را خاموش می‌کنم"
      ],
      "correct_answer_fa": [
          "من کندتر می‌روم",
          "من به دنبال یک ایستگاه شارژ نزدیک‌تر می‌گردم",
          "من سیستم گرمایش یا تهویه مطبوع را خاموش می‌کنم"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "25",
      "question_text": "Sie fahren hier mit Ihrem PKW. Wie verhalten Sie sich?",
      "answers": [
          "Ich fahre auf halbe Sicht",
          "Ich fahre am linken Fahrbahnrand",
          "Ich bremse vor der Kurve ab, um nicht zum rechten Fahrbahnrand zu rutschen",
          "Ich fahre ganz rechts auf das Bankett"
      ],
      "correct_answers": [
          "Ich fahre auf halbe Sicht",
          "Ich bremse vor der Kurve ab, um nicht zum rechten Fahrbahnrand zu rutschen"
      ],
      "question_text_fa": "شما در حال رانندگی با خودروی خود هستید. چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "من با نصف دید رانندگی می‌کنم",
          "من در لبه سمت چپ جاده رانندگی می‌کنم",
          "من قبل از پیچ ترمز می‌زنم تا به لبه سمت راست جاده نروم",
          "من کاملاً به سمت راست به بانکت می‌روم"
      ],
      "correct_answer_fa": [
          "من با نصف دید رانندگی می‌کنم",
          "من قبل از پیچ ترمز می‌زنم تا به لبه سمت راست جاده نروم"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "26",
      "question_text": "Sie fahren hier mit Ihrem PKW. Mit welchen besonderen Gefahren müssen Sie in dieser Kurve rechnen?",
      "answers": [
          "Mit erhöhter Schleudergefahr",
          "Mit Schneeverwehungen",
          "Mit Glatteis",
          "Mit Gegenverkehr"
      ],
      "correct_answers": [
          "Mit erhöhter Schleudergefahr",
          "Mit Glatteis",
          "Mit Gegenverkehr"
      ],
      "question_text_fa": "شما در حال رانندگی با خودروی خود هستید. با چه خطرات خاصی باید در این پیچ مواجه شوید؟",
      "answers_fa": [
          "با خطر لغزش افزایش یافته",
          "با وزش برف",
          "با یخ زدگی",
          "با ترافیک مقابل"
      ],
      "correct_answer_fa": [
          "با خطر لغزش افزایش یافته",
          "با یخ زدگی",
          "با ترافیک مقابل"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "29",
      "question_text": "Sie fahren mit etwa 100 km/h. Wie verhalten Sie sich?",
      "answers": [
          "Ich bleibe auf diesem Fahrstreifen, bremse ab und überhole nicht",
          "Ich werde vorsichtig beschleunigen und auf den linken Fahrstreifen wechseln",
          "Ich halte das Lenkrad mit beiden Händen fest",
          "Ich werde den LKW rasch überholen und mich dann rechts einordnen"
      ],
      "correct_answers": [
          "Ich bleibe auf diesem Fahrstreifen, bremse ab und überhole nicht",
          "Ich halte das Lenkrad mit beiden Händen fest"
      ],
      "question_text_fa": "شما با سرعت حدود 100 کیلومتر در ساعت رانندگی می‌کنید. چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "من در این لاین می‌مانم، ترمز می‌زنم و سبقت نمی‌گیرم",
          "من به آرامی شتاب می‌گیرم و به لاین چپ تغییر مسیر می‌دهم",
          "من فرمان را با دو دست محکم می‌گیرم",
          "من به سرعت کامیون را سبقت می‌گیرم و سپس به سمت راست می‌روم"
      ],
      "correct_answer_fa": [
          "من در این لاین می‌مانم، ترمز می‌زنم و سبقت نمی‌گیرم",
          "من فرمان را با دو دست محکم می‌گیرم"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "30",
      "question_text": "Sie fahren mit etwa 100 km/h. Welche Gefahren können hier beim Überholen auftreten?",
      "answers": [
          "Aquaplaninggefahr",
          "Ich könnte ins Schleudern kommen",
          "Der Bremsweg wird unkalkulierbar lang",
          "Der LKW vor mir könnte ins Schleudern kommen"
      ],
      "correct_answers": [
          "Ich könnte ins Schleudern kommen",
          "Der Bremsweg wird unkalkulierbar lang",
          "Der LKW vor mir könnte ins Schleudern kommen"
      ],
      "question_text_fa": "شما با سرعت حدود 100 کیلومتر در ساعت رانندگی می‌کنید. چه خطراتی ممکن است هنگام سبقت رخ دهد؟",
      "answers_fa": [
          "خطر آب‌گرفتگی",
          "من ممکن است به لغزش بیفتم",
          "مسیر ترمز غیرقابل پیش‌بینی طولانی خواهد شد",
          "کامیون جلوی من ممکن است به لغزش بیفتد"
      ],
      "correct_answer_fa": [
          "من ممکن است به لغزش بیفتم",
          "مسیر ترمز غیرقابل پیش‌بینی طولانی خواهد شد",
          "کامیون جلوی من ممکن است به لغزش بیفتد"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "65",
      "question_text": "Was verstehen Sie unter \"Schieben\" eines Kraftfahrzeuges?",
      "answers": [
          "Das Ausbrechen der Hinterräder",
          "Das Blockieren aller Räder",
          "Das Kippen des Fahrzeuges",
          "Dass das Fahrzeug dem Lenkeinschlag nicht folgt, sondern geradeaus weiterfährt"
      ],
      "correct_answers": [
          "Dass das Fahrzeug dem Lenkeinschlag nicht folgt, sondern geradeaus weiterfährt"
      ],
      "question_text_fa": "منظور شما از \"هل دادن\" یک وسیله نقلیه چیست؟",
      "answers_fa": [
          "سرخوردن چرخ‌های عقب",
          "قفل شدن تمامی چرخ‌ها",
          "چرخش وسیله نقلیه",
          "اینکه وسیله نقلیه به فرمان پاسخ نمی‌دهد و مستقیم به جلو حرکت می‌کند"
      ],
      "correct_answer_fa": [
          "اینکه وسیله نقلیه به فرمان پاسخ نمی‌دهد و مستقیم به جلو حرکت می‌کند"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "66",
      "question_text": "Ihr Fahrzeug ist mit einer elektronischen Fahrdynamik-Regelung ausgerüstet. Wie werden Sie sich verhalten, wenn Ihr Fahrzeug zu schieben beginnt?",
      "answers": [
          "Ich bremse ab",
          "Ich kupple aus",
          "Ich gebe leicht Gas",
          "Ich lenke dem Kurvenverlauf entsprechend"
      ],
      "correct_answers": [
          "Ich bremse ab",
          "Ich kupple aus",
          "Ich lenke dem Kurvenverlauf entsprechend"
      ],
      "question_text_fa": "وسیله نقلیه شما با یک سیستم کنترل دینامیک الکترونیکی تجهیز شده است. اگر وسیله نقلیه شما شروع به لغزش کند، چگونه رفتار خواهید کرد؟",
      "answers_fa": [
          "من ترمز می‌زنم",
          "من کلاچ را جدا می‌کنم",
          "من کمی گاز می‌زنم",
          "من با توجه به مسیر منحنی فرمان می‌زنم"
      ],
      "correct_answer_fa": [
          "من ترمز می‌زنم",
          "من کلاچ را جدا می‌کنم",
          "من با توجه به مسیر منحنی فرمان می‌زنم"
      ],
      "category": "B - Gefahrenlehre, Antriebe, Pannen"
  },
  {
      "question_number": "86",
      "question_text": "Wie verhalten Sie sich in dieser Verkehrssituation?",
      "answers": [
          "Ich fahre auf Gefahrensicht",
          "Solang die Fahrbahn ausreichend geräumt und gestreut ist, kann ich ohne Schneeketten weiterfahren",
          "Ich fahre mit dem 1. Gang weiter",
          "Ich muss hier auf jeden Fall Schneeketten auf allen vier Rädern montieren"
      ],
      "correct_answers": [
          "Solang die Fahrbahn ausreichend geräumt und gestreut ist, kann ich ohne Schneeketten weiterfahren",
          "Ich fahre mit dem 1. Gang weiter"
      ],
      "question_text_fa": "در این وضعیت ترافیکی چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "من با دید خطر رانندگی می‌کنم",
          "تا زمانی که جاده به اندازه کافی پاک و نمک‌پاشی شده باشد، می‌توانم بدون زنجیر برف ادامه دهم",
          "من با دنده اول ادامه می‌دهم",
          "من باید حتماً زنجیر برف روی هر چهار چرخ نصب کنم"
      ],
      "correct_answer_fa": [
          "تا زمانی که جاده به اندازه کافی پاک و نمک‌پاشی شده باشد، می‌توانم بدون زنجیر برف ادامه دهم",
          "من با دنده اول ادامه می‌دهم"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "87",
      "question_text": "Ihr PKW hat Allradantrieb. Welche Aussage(n) zur Wahl der Fahrgeschwindigkeit treffen zu?",
      "answers": [
          "Ich kann gefahrlos schneller fahren als mit einem Fahrzeug mit Hinterradantrieb",
          "Ich kann gefahrlos schneller fahren als mit einem Fahrzeug mit Vorderradantrieb",
          "Ich kann hier mit 50 km/h gefahrlos fahren",
          "Ich werde nicht schneller fahren als mit einem Fahrzeug, das keinen Allradantrieb hat"
      ],
      "correct_answers": [
          "Ich werde nicht schneller fahren als mit einem Fahrzeug, das keinen Allradantrieb hat"
      ],
      "question_text_fa": "خودروی شما دارای سیستم چهارچرخ متحرک است. کدام بیان(ها) در مورد انتخاب سرعت رانندگی صحیح است؟",
      "answers_fa": [
          "من می‌توانم بدون خطر سریع‌تر از خودرویی با سیستم دوچرخ متحرک رانندگی کنم",
          "من می‌توانم بدون خطر سریع‌تر از خودرویی با سیستم جلوچرخ متحرک رانندگی کنم",
          "من می‌توانم در اینجا با سرعت 50 کیلومتر در ساعت بدون خطر رانندگی کنم",
          "من نمی‌توانم سریع‌تر از خودرویی که سیستم چهارچرخ متحرک ندارد، رانندگی کنم"
      ],
      "correct_answer_fa": [
          "من نمی‌توانم سریع‌تر از خودرویی که سیستم چهارچرخ متحرک ندارد، رانندگی کنم"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "90",
      "question_text": "Sie fahren hier mit einem Klein-LKW. Wie verhalten Sie sich?",
      "answers": [
          "Ich schalte auf einen möglichst hohen Gang und bremse dauernd mit",
          "Ich wähle einen Gang, bei dem die Bremswirkung des Motors allein ausreicht, die gewünschte Geschwindigkeit zu halten",
          "Ich lasse das Fahrzeug im Leerlauf rollen",
          "Sollte ich die Bremsen überlastet haben und die Bremswirkung nachlassen, halte ich an, um die Bremsen auskühlen zu lassen"
      ],
      "correct_answers": [
          "Ich wähle einen Gang, bei dem die Bremswirkung des Motors allein ausreicht, die gewünschte Geschwindigkeit zu halten",
          "Sollte ich die Bremsen überlastet haben und die Bremswirkung nachlassen, halte ich an, um die Bremsen auskühlen zu lassen"
      ],
      "question_text_fa": "شما در حال رانندگی با یک کامیون کوچک هستید. چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "من به دنده‌ای با بالاترین سرعت تغییر می‌دهم و دائماً ترمز می‌زنم",
          "من دنده‌ای را انتخاب می‌کنم که نیروی ترمز موتور به تنهایی کافی باشد تا سرعت مورد نظر را حفظ کند",
          "من اجازه می‌دهم وسیله نقلیه در حالت خنثی حرکت کند",
          "اگر ترمزها تحت فشار قرار بگیرند و کارایی آن‌ها کاهش یابد، متوقف می‌شوم تا ترمزها خنک شوند"
      ],
      "correct_answer_fa": [
          "من دنده‌ای را انتخاب می‌کنم که نیروی ترمز موتور به تنهایی کافی باشد تا سرعت مورد نظر را حفظ کند",
          "اگر ترمزها تحت فشار قرار بگیرند و کارایی آن‌ها کاهش یابد، متوقف می‌شوم تا ترمزها خنک شوند"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "91",
      "question_text": "Sie fahren hier mit einem Klein-LKW. Woran können Sie erkennen, dass die Motorbremswirkung ausreicht?",
      "answers": [
          "Wenn das Fahrzeug immer schneller wird",
          "Wenn die Geschwindigkeit annähernd gleich bleibt, ohne dass ich mitbremsen muss",
          "Wenn die Kontrollleuchte für die Bremse dunkel bleibt",
          "Wenn ich dauernd leicht mitbremsen muss"
      ],
      "correct_answers": [
          "Wenn die Geschwindigkeit annähernd gleich bleibt, ohne dass ich mitbremsen muss"
      ],
      "question_text_fa": "شما در حال رانندگی با یک کامیون کوچک هستید. چگونه می‌توانید تشخیص دهید که نیروی ترمز موتور کافی است؟",
      "answers_fa": [
          "وقتی وسیله نقلیه دائماً سریع‌تر می‌شود",
          "وقتی سرعت تقریباً ثابت می‌ماند، بدون اینکه من ترمز بزنم",
          "وقتی چراغ کنترل ترمز خاموش می‌ماند",
          "وقتی دائماً باید کمی ترمز بزنم"
      ],
      "correct_answer_fa": [
          "وقتی سرعت تقریباً ثابت می‌ماند، بدون اینکه من ترمز بزنم"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "131",
      "question_text": "Sie fahren hier mit Ihrem PKW. Wie verhalten Sie sich?",
      "answers": [
          "Ich muss auf jeden Fall auf allen Rädern Schneeketten montieren",
          "Solang die Fahrbahn ausreichend geräumt und gestreut ist, kann ich ohne Schneeketten weiterfahren",
          "Ich fahre mit dem 1. Gang",
          "Ich rechne im Schatten mit vereister Fahrbahn"
      ],
      "correct_answers": [
          "Solang die Fahrbahn ausreichend geräumt und gestreut ist, kann ich ohne Schneeketten weiterfahren",
          "Ich fahre mit dem 1. Gang",
          "Ich rechne im Schatten mit vereister Fahrbahn"
      ],
      "question_text_fa": "شما در حال رانندگی با خودروی خود هستید. چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "من باید حتماً زنجیر برف را روی همه چرخ‌ها نصب کنم",
          "تا زمانی که جاده به اندازه کافی پاک و نمک‌پاشی شده باشد، می‌توانم بدون زنجیر برف ادامه دهم",
          "من با دنده اول رانندگی می‌کنم",
          "من در سایه انتظار یخ‌زدگی جاده را دارم"
      ],
      "correct_answer_fa": [
          "تا زمانی که جاده به اندازه کافی پاک و نمک‌پاشی شده باشد، می‌توانم بدون زنجیر برف ادامه دهم",
          "من با دنده اول رانندگی می‌کنم",
          "من در سایه انتظار یخ‌زدگی جاده را دارم"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "132",
      "question_text": "Sie fahren hier mit einem PKW. Welche Gefahren bestehen, wenn Sie hier für die Situation zu schnell fahren?",
      "answers": [
          "Die Motorkühlung könnte einfrieren",
          "Das Fahrzeug könnte trotz einer Fahrdynamik-Regelung ins Rutschen kommen",
          "Die Reifen könnten beschädigt werden",
          "Das Fahrzeug könnte unkontrollierbar werden, wenn es ins Rutschen kommt"
      ],
      "correct_answers": [
          "Das Fahrzeug könnte trotz einer Fahrdynamik-Regelung ins Rutschen kommen",
          "Das Fahrzeug könnte unkontrollierbar werden, wenn es ins Rutschen kommt"
      ],
      "question_text_fa": "شما در حال رانندگی با خودروی خود هستید. چه خطراتی وجود دارد اگر در اینجا برای شرایط بیش از حد سریع رانندگی کنید؟",
      "answers_fa": [
          "سیستم خنک کننده موتور ممکن است یخ بزند",
          "وسیله نقلیه ممکن است با وجود سیستم کنترل دینامیک به لیز خوردن بیفتد",
          "چرخ‌ها ممکن است آسیب ببینند",
          "وسیله نقلیه ممکن است غیرقابل کنترل شود اگر به لیز خوردن بیفتد"
      ],
      "correct_answer_fa": [
          "وسیله نقلیه ممکن است با وجود سیستم کنترل دینامیک به لیز خوردن بیفتد",
          "وسیله نقلیه ممکن است غیرقابل کنترل شود اگر به لیز خوردن بیفتد"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "133",
      "question_text": "Sie fahren mit einem Klein-LKW. Mit welchen Unterschieden im Fahrverhalten gegenüber einem PKW müssen Sie rechnen?",
      "answers": [
          "Der Klein-LKW ist bei Seitenwind weniger anfällig auf Spurversatz",
          "Der Klein-LKW ist bei Seitenwind anfälliger auf Spurversatz",
          "Der Klein-LKW kann in Kurven leichter umkippen",
          "Der PKW kann in Kurven leichter umkippen"
      ],
      "correct_answers": [
          "Der Klein-LKW ist bei Seitenwind anfälliger auf Spurversatz",
          "Der Klein-LKW kann in Kurven leichter umkippen"
      ],
      "question_text_fa": "شما در حال رانندگی با یک کامیون کوچک هستید. با چه تفاوت‌هایی در رفتار رانندگی نسبت به یک خودروی سواری باید روبه‌رو شوید؟",
      "answers_fa": [
          "کامیون کوچک در برابر وزش باد جانبی کمتر مستعد جابجایی مسیر است",
          "کامیون کوچک در برابر وزش باد جانبی مستعدتر به جابجایی مسیر است",
          "کامیون کوچک در پیچ‌ها ممکن است راحت‌تر برگردد",
          "خودروی سواری ممکن است در پیچ‌ها راحت‌تر برگردد"
      ],
      "correct_answer_fa": [
          "کامیون کوچک در برابر وزش باد جانبی مستعدتر به جابجایی مسیر است",
          "کامیون کوچک در پیچ‌ها ممکن است راحت‌تر برگردد"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "134",
      "question_text": "Sie fahren mit einem Klein-LKW. Wie berücksichtigen Sie das beim Fahren?",
      "answers": [
          "Ich fahre in Kurven langsamer als mit einem PKW",
          "Ich wähle die Fahrlinie näher zur Fahrbahnmitte als mit einem PKW",
          "Ich fahre bei starkem Seitenwind langsamer als mit einem PKW",
          "Ich fahre in einem starken Gefälle schneller als mit einem PKW"
      ],
      "correct_answers": [
          "Ich fahre in Kurven langsamer als mit einem PKW",
          "Ich fahre bei starkem Seitenwind langsamer als mit einem PKW"
      ],
      "question_text_fa": "شما در حال رانندگی با یک کامیون کوچک هستید. چگونه این را در هنگام رانندگی در نظر می‌گیرید؟",
      "answers_fa": [
          "من در پیچ‌ها کندتر از خودروی سواری رانندگی می‌کنم",
          "من خط حرکت را نزدیک‌تر به وسط جاده نسبت به خودروی سواری انتخاب می‌کنم",
          "من در برابر وزش باد جانبی قوی کندتر از خودروی سواری رانندگی می‌کنم",
          "من در شیب تند سریع‌تر از خودروی سواری رانندگی می‌کنم"
      ],
      "correct_answer_fa": [
          "من در پیچ‌ها کندتر از خودروی سواری رانندگی می‌کنم",
          "من در برابر وزش باد جانبی قوی کندتر از خودروی سواری رانندگی می‌کنم"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "144",
      "question_text": "Was verstehen Sie unter dem \"Schleudern\" eines Kraftfahrzeuges?",
      "answers": [
          "Das Ausbrechen der Hinterräder",
          "Das Blockieren aller Räder",
          "Das Kippen des Fahrzeuges",
          "Dass das Fahrzeug dem Lenkeinschlag nicht folgt, sondern geradeaus weiterfährt"
      ],
      "correct_answers": [
          "Das Ausbrechen der Hinterräder"
      ],
      "question_text_fa": "منظور شما از \"لیز خوردن\" یک وسیله نقلیه چیست؟",
      "answers_fa": [
          "خروج چرخ‌های عقب",
          "قفل شدن تمامی چرخ‌ها",
          "چرخش وسیله نقلیه",
          "اینکه وسیله نقلیه به فرمان پاسخ نمی‌دهد و مستقیم به جلو حرکت می‌کند"
      ],
      "correct_answer_fa": [
          "خروج چرخ‌های عقب"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "145",
      "question_text": "Ihr Fahrzeug ist mit einer elektronischen Fahrdynamik-Regelung ausgerüstet. Wie werden Sie sich verhalten, wenn Ihr Fahrzeug zu schleudern beginnt?",
      "answers": [
          "Ich bremse ab",
          "Ich kupple aus",
          "Ich gebe leicht Gas",
          "Ich lenke dem Kurvenverlauf entsprechend"
      ],
      "correct_answers": [
          "Ich bremse ab",
          "Ich kupple aus",
          "Ich lenke dem Kurvenverlauf entsprechend"
      ],
      "question_text_fa": "وسیله نقلیه شما با یک سیستم کنترل دینامیک الکترونیکی تجهیز شده است. اگر وسیله نقلیه شما شروع به لیز خوردن کند، چگونه رفتار خواهید کرد؟",
      "answers_fa": [
          "من ترمز می‌زنم",
          "من کلاچ را جدا می‌کنم",
          "من کمی گاز می‌زنم",
          "من مطابق با مسیر منحنی فرمان می‌زنم"
      ],
      "correct_answer_fa": [
          "من ترمز می‌زنم",
          "من کلاچ را جدا می‌کنم",
          "من مطابق با مسیر منحنی فرمان می‌زنم"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "1519",
      "question_text": "Sie fahren mit Ihrem PKW und betätigen das Bremspedal. Dabei bemerken Sie, dass der Leerweg wesentlich größer als normal ist. Was schließen Sie daraus?",
      "answers": [
          "Das Bremssystem könnte defekt sein",
          "Die Bremsbeläge könnten zu stark abgenutzt sein",
          "Die Bremsflüssigkeit könnte zu alt geworden sein",
          "Die Bremsbeläge könnten zu alt geworden sein"
      ],
      "correct_answers": [
          "Das Bremssystem könnte defekt sein"
      ],
      "question_text_fa": "شما با خودروی خود رانندگی می‌کنید و پدال ترمز را فشار می‌دهید. در این حین متوجه می‌شوید که فاصله خالی پدال ترمز خیلی بیشتر از حد معمول است. چه نتیجه‌ای می‌گیرید؟",
      "answers_fa": [
          "ممکن است سیستم ترمز خراب باشد",
          "ممکن است لنت‌های ترمز بیش از حد فرسوده شده باشند",
          "ممکن است مایع ترمز کهنه شده باشد",
          "ممکن است لنت‌های ترمز کهنه شده باشند"
      ],
      "correct_answers_fa": [
          "ممکن است سیستم ترمز خراب باشد"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  }
  ,
  {
      "question_number": "1520",
      "question_text": "Wie verhalten Sie sich, wenn Sie einen Defekt an der Betriebsbremse feststellen?",
      "answers": [
          "Ich halte an und kontrolliere den Bremsflüssigkeitsstand",
          "Ich fahre weiter und lasse beim nächsten Service die Bremse kontrollieren",
          "Ich halte an und führe mit dem Bremspedal eine Druckprobe durch",
          "Ich fahre weiter und benutze zum Anhalten die Feststellbremse"
      ],
      "correct_answers": [
          "Ich halte an und kontrolliere den Bremsflüssigkeitsstand",
          "Ich halte an und führe mit dem Bremspedal eine Druckprobe durch"
      ],
      "question_text_fa": "چگونه رفتار می‌کنید اگر یک نقص در ترمز عملیاتی تشخیص دهید؟",
      "answers_fa": [
          "من توقف می‌کنم و سطح مایع ترمز را بررسی می‌کنم",
          "من به راه ادامه می‌دهم و اجازه می‌دهم در سرویس بعدی ترمز را بررسی کنند",
          "من توقف می‌کنم و با پدال ترمز یک آزمایش فشار انجام می‌دهم",
          "من به راه ادامه می‌دهم و از ترمز دستی برای توقف استفاده می‌کنم"
      ],
      "correct_answer_fa": [
          "من توقف می‌کنم و سطح مایع ترمز را بررسی می‌کنم",
          "من توقف می‌کنم و با پدال ترمز یک آزمایش فشار انجام می‌دهم"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "1521",
      "question_text": "Sie überprüfen die Bremsanlage Ihres PKW am Stand. Reicht das aus um festzustellen, ob die Bremsen einwandfrei funktionieren? Warum?",
      "answers": [
          "Ja, weil ich den Leerweg und die Bremsflüssigkeit kontrollieren kann",
          "Nein, weil ich weder die Wirkung noch die Gleichmäßigkeit der Bremsungen überprüfen kann",
          "Nein, weil ich den Leerweg nur während der Fahrt überprüfen kann",
          "Ja, weil damit die Bremsanlage vollständig überprüft ist"
      ],
      "correct_answers": [
          "Nein, weil ich weder die Wirkung noch die Gleichmäßigkeit der Bremsungen überprüfen kann"
      ],
      "question_text_fa": "شما در حال بررسی سیستم ترمز خودروی خود هستید. آیا این کافی است که مشخص کنید آیا ترمزها به درستی کار می‌کنند؟ چرا؟",
      "answers_fa": [
          "بله، زیرا می‌توانم خالی بودن و مایع ترمز را کنترل کنم",
          "خیر، زیرا نمی‌توانم نه اثر و نه یکنواختی ترمزها را بررسی کنم",
          "خیر، زیرا فقط می‌توانم خالی بودن را در حین رانندگی بررسی کنم",
          "بله، زیرا با این کار سیستم ترمز به طور کامل بررسی می‌شود"
      ],
      "correct_answer_fa": [
          "خیر، زیرا نمی‌توانم نه اثر و نه یکنواختی ترمزها را بررسی کنم"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "1522",
      "question_text": "Sie überprüfen die Bremsanlage Ihres PKW am Stand. Bei der Druckprobe am Bremspedal bemerken Sie, dass das Bremspedal langsam nachgibt. Was schließen Sie daraus?",
      "answers": [
          "Das Bremssystem ist undicht geworden",
          "Die Bremsbeläge sind verschmutzt",
          "Die Bremsflüssigkeit ist zu verschmutzt",
          "Die Bremsflüssigkeit ist zu alt"
      ],
      "correct_answers": [
          "Das Bremssystem ist undicht geworden"
      ],
      "question_text_fa": "شما سیستم ترمز خودروی خود را در حالت ایستاده بررسی می‌کنید. هنگام آزمایش فشار بر روی پدال ترمز متوجه می‌شوید که پدال ترمز به آرامی پایین می‌رود. چه نتیجه‌ای می‌گیرید؟",
      "answers_fa": [
          "ممکن است سیستم ترمز نشتی داشته باشد",
          "ممکن است لنت‌های ترمز کثیف شده باشند",
          "ممکن است مایع ترمز آلوده شده باشد",
          "ممکن است مایع ترمز کهنه شده باشد"
      ],
      "correct_answers_fa": [
          "ممکن است سیستم ترمز نشتی داشته باشد"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  }
  ,
  {
      "question_number": "1523",
      "question_text": "Es ist zu wenig Bremsflüssigkeit im Vorratsbehälter. Welche Ursachen kann dies haben?",
      "answers": [
          "Dass die Bremsflüssigkeit im Lauf der Zeit verdunstet ist",
          "Dass sich die Bremsbeläge abgenutzt haben",
          "Dass die Bremsanlage undicht geworden ist",
          "Dass die Bremsen überhitzt wurden"
      ],
      "correct_answers": [
          "Dass sich die Bremsbeläge abgenutzt haben",
          "Dass die Bremsanlage undicht geworden ist"
      ],
      "question_text_fa": "شما متوجه می‌شوید که سطح مایع ترمز در مخزن کم است. این چه عللی می‌تواند داشته باشد؟",
      "answers_fa": [
          "اینکه مایع ترمز در طول زمان تبخیر شده است",
          "اینکه لنت‌های ترمز فرسوده شده‌اند",
          "اینکه سیستم ترمز نشتی پیدا کرده است",
          "اینکه ترمزها داغ شده‌اند"
      ],
      "correct_answer_fa": [
          "اینکه لنت‌های ترمز فرسوده شده‌اند",
          "اینکه سیستم ترمز نشتی پیدا کرده است"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "1524",
      "question_text": "Sie stellen fest, dass der Bremsflüssigkeitsstand im Vorratsbehälter zu weit abgesunken ist. Wie verhalten Sie sich?",
      "answers": [
          "Ich muss die gesamte Bremsflüssigkeit wechseln lassen",
          "Ich führe eine Dichtheitsprobe durch",
          "Ich lasse die Bremse in einer Fachwerkstätte überprüfen",
          "Ich fahre so lange weiter, bis der nächste Servicetermin ansteht"
      ],
      "correct_answers": [
          "Ich führe eine Dichtheitsprobe durch",
          "Ich lasse die Bremse in einer Fachwerkstätte überprüfen"
      ],
      "question_text_fa": "شما متوجه می‌شوید که سطح مایع ترمز در مخزن خیلی پایین آمده است. چگونه رفتار می‌کنید؟",
      "answers_fa": [
          "من باید کل مایع ترمز را عوض کنم",
          "من یک آزمایش نشتی انجام می‌دهم",
          "من اجازه می‌دهم ترمز را در یک تعمیرگاه تخصصی بررسی کنند",
          "من تا زمان برگزاری سرویس بعدی ادامه می‌دهم"
      ],
      "correct_answer_fa": [
          "من یک آزمایش نشتی انجام می‌دهم",
          "من اجازه می‌دهم ترمز را در یک تعمیرگاه تخصصی بررسی کنند"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "1525",
      "question_text": "Die Bremsflüssigkeit in Ihrem Fahrzeug ist schon mehrere Jahre lang nicht gewechselt worden. Kann das gefährlich werden? Warum?",
      "answers": [
          "Nein",
          "Ja, weil sich dann beim längeren Bremsen Dampfblasen bilden können. Dann funktioniert die Bremse nicht mehr",
          "Ja, weil sich dann die Bremsen stärker als normal abnutzen",
          "Ja, weil dann beim Bremsen giftige Dämpfe entstehen können"
      ],
      "correct_answers": [
          "Ja, weil sich dann beim längeren Bremsen Dampfblasen bilden können. Dann funktioniert die Bremse nicht mehr"
      ],
      "question_text_fa": "مایع ترمز در خودروی شما برای چندین سال تعویض نشده است. آیا این می‌تواند خطرناک باشد؟ چرا؟",
      "answers_fa": [
          "خیر",
          "بله، زیرا در صورت ترمز طولانی مدت، حباب‌های بخار تشکیل می‌شوند. سپس ترمز دیگر کار نمی‌کند",
          "بله، زیرا در این صورت ترمزها بیشتر از حد طبیعی فرسوده می‌شوند",
          "بله، زیرا در این صورت بخارات سمی هنگام ترمز کردن ایجاد می‌شوند"
      ],
      "correct_answer_fa": [
          "بله، زیرا در صورت ترمز طولانی مدت، حباب‌های بخار تشکیل می‌شوند. سپس ترمز دیگر کار نمی‌کند"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "1526",
      "question_text": "Wie oft soll die Bremsflüssigkeit Ihres Fahrzeuges gewechselt werden?",
      "answers": [
          "Immer dann, wenn der Bremsflüssigkeitsstand im Vorratsbehälter die Minimum-Marke erreicht hat",
          "Spätestens alle 2 Jahre, außer es steht in der Betriebsanleitung etwas anderes",
          "Immer dann, wenn die Bremsen-Warnleuchte aufleuchtet",
          "Immer dann, wenn die Bremsflüssigkeit die Farbe wechselt"
      ],
      "correct_answers": [
          "Spätestens alle 2 Jahre, außer es steht in der Betriebsanleitung etwas anderes"
      ],
      "question_text_fa": "مایع ترمز خودروی شما باید چه مدت به تعویض شود؟",
      "answers_fa": [
          "همیشه زمانی که سطح مایع ترمز در مخزن به حداقل می‌رسد",
          "حداکثر هر ۲ سال، مگر اینکه در دفترچه راهنما چیز دیگری ذکر شده باشد",
          "همیشه زمانی که چراغ هشدار ترمز روشن می‌شود",
          "همیشه زمانی که مایع ترمز رنگش تغییر می‌کند"
      ],
      "correct_answer_fa": [
          "حداکثر هر ۲ سال، مگر اینکه در دفترچه راهنما چیز دیگری ذکر شده باشد"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "1720",
      "question_text": "In Ihrem PKW leuchtet diese Kontrollleuchte während der Fahrt auf. Was bedeutet das?",
      "answers": [
          "Dass die Bremsbeläge abgenutzt sind",
          "Dass die Bremsbeläge nass geworden sind",
          "Dass die Bremsflüssigkeit zu alt geworden ist",
          "Dass das Bremslicht ausgefallen ist"
      ],
      "correct_answers": [
          "Dass die Bremsbeläge abgenutzt sind"
      ],
      "question_text_fa": "در خودروی شما این چراغ هشدار در حین رانندگی روشن می‌شود. این چه معنی دارد؟",
      "answers_fa": [
          "اینکه لنت‌های ترمز فرسوده شده‌اند",
          "اینکه لنت‌های ترمز خیس شده‌اند",
          "اینکه مایع ترمز قدیمی شده است",
          "اینکه چراغ ترمز از کار افتاده است"
      ],
      "correct_answer_fa": [
          "اینکه لنت‌های ترمز فرسوده شده‌اند"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "1721",
      "question_text": "In Ihrem PKW leuchtet diese Kontrollleuchte während der Fahrt auf. Wie sollten Sie sich verhalten?",
      "answers": [
          "Ich sollte möglichst bald einen Werkstatttermin wahrnehmen",
          "Ich muss den PKW abschleppen lassen",
          "Ich darf den PKW nicht mehr abschleppen lassen",
          "Ich muss sofort Bremsflüssigkeit nachfüllen"
      ],
      "correct_answers": [
          "Ich sollte möglichst bald einen Werkstatttermin wahrnehmen"
      ],
      "question_text_fa": "در خودروی شما این چراغ هشدار در حین رانندگی روشن می‌شود. چگونه باید رفتار کنید؟",
      "answers_fa": [
          "من باید هر چه سریع‌تر یک قرار ملاقات در تعمیرگاه بگذارم",
          "من باید خودروی خود را به یدک‌کش بسپارم",
          "من نباید خودروی خود را به یدک‌کش بسپارم",
          "من باید فوراً مایع ترمز را اضافه کنم"
      ],
      "correct_answer_fa": [
          "من باید هر چه سریع‌تر یک قرار ملاقات در تعمیرگاه بگذارم"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "1722",
      "question_text": "Wie überprüfen Sie den Bremskraftverstärker Ihres PKW?",
      "answers": [
          "Ich betätige bei abgestelltem Motor mehrfach das Bremspedal. Danach starte ich den Motor. Das Bremspedal muss etwas nachgeben",
          "Ich fahre mit etwa 20 km/h und mache einen Bremsversuch. Dabei muss der PKW nach 10 m stehen",
          "Das geht nur in der Werkstatt",
          "Das geht nur beim Abschleppen"
      ],
      "correct_answers": [
          "Ich betätige bei abgestelltem Motor mehrfach das Bremspedal. Danach starte ich den Motor. Das Bremspedal muss etwas nachgeben"
      ],
      "question_text_fa": "چگونه تقویت‌کننده ترمز خودروی خود را بررسی می‌کنید؟",
      "answers_fa": [
          "من چند بار پدال ترمز را در حالت خاموش فشار می‌دهم. سپس موتور را روشن می‌کنم. پدال ترمز باید کمی فرو برود",
          "من با سرعت تقریباً ۲۰ کیلومتر در ساعت رانندگی می‌کنم و یک آزمایش ترمز انجام می‌دهم. در این حالت، خودروی باید بعد از ۱۰ متر بایستد",
          "این فقط در تعمیرگاه ممکن است",
          "این فقط هنگام یدک‌کشی ممکن است"
      ],
      "correct_answer_fa": [
          "من چند بار پدال ترمز را در حالت خاموش فشار می‌دهم. سپس موتور را روشن می‌کنم. پدال ترمز باید کمی فرو برود"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "1723",
      "question_text": "Welche Gefahr besteht, wenn Sie mit einem defekten Bremskraftverstärker fahren?",
      "answers": [
          "Der Bremsweg wird länger, da das Bremspedal viel kräftiger betätigt werden muss",
          "Die Bremsen überhitzen leicht",
          "Die Bremsen neigen zum Blockieren",
          "Die Bremswirkung fällt völlig aus"
      ],
      "correct_answers": [
          "Der Bremsweg wird länger, da das Bremspedal viel kräftiger betätigt werden muss"
      ],
      "question_text_fa": "چه خطری وجود دارد اگر با تقویت‌کننده ترمز معیوب رانندگی کنید؟",
      "answers_fa": [
          "مسافت ترمز طولانی‌تر می‌شود، زیرا پدال ترمز باید با قدرت بیشتری فشار داده شود",
          "ترمزها به راحتی داغ می‌شوند",
          "ترمزها به سمت قفل شدن تمایل دارند",
          "اثر ترمز کاملاً از بین می‌رود"
      ],
      "correct_answer_fa": [
          "مسافت ترمز طولانی‌تر می‌شود، زیرا پدال ترمز باید با قدرت بیشتری فشار داده شود"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "1724",
      "question_text": "In Ihrem PKW leuchtet während der Fahrt diese Warnlampe auf. Was kann das bedeuten?",
      "answers": [
          "Dass ein Teil der Bremsanlage eine Störung hat",
          "Dass das Bremslicht ausgefallen ist",
          "Dass ein Teil der Bremsanlage ausgefallen ist",
          "Dass die Bremse überhitzt wurde"
      ],
      "correct_answers": [
          "Dass ein Teil der Bremsanlage eine Störung hat",
          "Dass ein Teil der Bremsanlage ausgefallen ist"
      ],
      "question_text_fa": "در خودروی شما در حین حرکت این چراغ هشدار روشن می‌شود. این می‌تواند به چه معنا باشد؟",
      "answers_fa": [
          "بخشی از سیستم ترمز دچار اختلال شده است",
          "چراغ ترمز خراب شده است",
          "بخشی از سیستم ترمز خراب شده است",
          "ترمز داغ شده است"
      ],
      "correct_answers_fa": [
          "بخشی از سیستم ترمز دچار اختلال شده است",
          "بخشی از سیستم ترمز خراب شده است"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  }
  ,
  {
      "question_number": "1725",
      "question_text": "In Ihrem PKW leuchtet während der Fahrt diese Warnlampe auf. Wie verhalten Sie sich?",
      "answers": [
          "Ich halte sofort an und rechne dabei, dass die Bremswirkung nicht so stark wie gewohnt ist",
          "Nach dem Anhalten mache ich eine vollständige Standbremsprobe",
          "Ich fahre vorsichtig bis zur nächsten Werkstatt und lasse erst dort die Bremsanlage überprüfen",
          "Ich fahre vorsichtig bis zur nächsten Tankstelle und lasse erst dort die Bremsanlage überprüfen"
      ],
      "correct_answers": [
          "Ich halte sofort an und rechne dabei, dass die Bremswirkung nicht so stark wie gewohnt ist",
          "Nach dem Anhalten mache ich eine vollständige Standbremsprobe"
      ],
      "question_text_fa": "در خودروی شما در حین رانندگی این چراغ هشدار روشن می‌شود. چگونه باید عمل کنید؟",
      "answers_fa": [
          "من فوراً توقف می‌کنم و به احتمال کم بودن اثر ترمز نسبت به حالت عادی توجه می‌کنم",
          "بعد از توقف، یک تست کامل ترمز در حالت ایستاده انجام می‌دهم",
          "من با احتیاط تا اولین تعمیرگاه ادامه می‌دهم و تنها در آنجا سیستم ترمز را بررسی می‌کنم",
          "من با احتیاط تا اولین پمپ بنزین ادامه می‌دهم و تنها در آنجا سیستم ترمز را بررسی می‌کنم"
      ],
      "correct_answers_fa": [
          "من فوراً توقف می‌کنم و به احتمال کم بودن اثر ترمز نسبت به حالت عادی توجه می‌کنم",
          "بعد از توقف، یک تست کامل ترمز در حالت ایستاده انجام می‌دهم"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  
  
  {
      "question_number": "1728",
      "question_text": "Wodurch können Sie während der Fahrt feststellen, dass die Fußbremse Ihres PKW defekt ist?",
      "answers": [
          "Daran, dass die rote Bremskontrollleuchte aufleuchtet",
          "Daran, dass der PKW nicht so stark wie gewohnt bremst",
          "Daran, dass sich das Bremspedal plötzlich viel weiter als gewohnt treten lässt",
          "Daran, dass die gelbe Bremskontrollleuchte aufleuchtet"
      ],
      "correct_answers": [
          "Daran, dass die rote Bremskontrollleuchte aufleuchtet",
          "Daran, dass der PKW nicht so stark wie gewohnt bremst",
          "Daran, dass sich das Bremspedal plötzlich viel weiter als gewohnt treten lässt"
      ],
      "question_text_fa": "چگونه می‌توانید در حین رانندگی متوجه شوید که ترمز پایی خودروی شما خراب است؟",
      "answers_fa": [
          "از روشن شدن چراغ قرمز کنترل ترمز",
          "از اینکه خودرو به اندازه معمول ترمز نمی‌گیرد",
          "از اینکه پدال ترمز به‌طور ناگهانی بیش از حد معمول پایین می‌رود",
          "از روشن شدن چراغ کنترل ترمز زرد"
      ],
      "correct_answers_fa": [
          "از روشن شدن چراغ قرمز کنترل ترمز",
          "از اینکه خودرو به اندازه معمول ترمز نمی‌گیرد",
          "از اینکه پدال ترمز به‌طور ناگهانی بیش از حد معمول پایین می‌رود"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "1729",
      "question_text": "Sie haben Ihren PKW wegen eines Bremsdefektes angehalten. Wie verhalten Sie sich?",
      "answers": [
          "Ich mache eine vollständige Standbremsprobe",
          "Ich lasse das Fahrzeug abschleppen, wenn ich mit der Fußbremse keine Bremswirkung mehr erziele",
          "Ich lese in der Betriebsanleitung des PKW nach, was zu tun ist",
          "Ich fahre bis zum nächsten Servicetermin weiter"
      ],
      "correct_answers": [
          "Ich mache eine vollständige Standbremsprobe",
          "Ich lasse das Fahrzeug abschleppen, wenn ich mit der Fußbremse keine Bremswirkung mehr erziele",
          "Ich lese in der Betriebsanleitung des PKW nach, was zu tun ist"
      ],
      "question_text_fa": "شما به دلیل نقص در سیستم ترمز خودرویتان توقف کرده‌اید. چگونه عمل می‌کنید؟",
      "answers_fa": [
          "یک تست کامل ترمز در حالت ایستاده انجام می‌دهم",
          "اگر ترمز پایی دیگر اثر نداشته باشد، خودرو را یدک می‌کشم",
          "دفترچه راهنمای خودرو را می‌خوانم تا ببینم چه باید کرد",
          "تا موعد سرویس بعدی به رانندگی ادامه می‌دهم"
      ],
      "correct_answers_fa": [
          "یک تست کامل ترمز در حالت ایستاده انجام می‌دهم",
          "اگر ترمز پایی دیگر اثر نداشته باشد، خودرو را یدک می‌کشم",
          "دفترچه راهنمای خودرو را می‌خوانم تا ببینم چه باید کرد"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "2498",
      "question_text": "Sie fahren mit Ihrem PKW. Was bedeutet das Blinken dieser Kontrollleuchte?",
      "answers": [
          "Dass die Fahrdynamikregelung (ESC, ESP, DSC, ...) aktiv ist",
          "Dass die Temperatur des Kühlwassers zu gering ist",
          "Dass der Tempomat aktiviert ist",
          "Dass die Servolenkung ausgefallen ist"
      ],
      "correct_answers": [
          "Dass die Fahrdynamikregelung (ESC, ESP, DSC, ...) aktiv ist"
      ],
      "question_text_fa": "شما با خودروی خود رانندگی می‌کنید. این چراغ کنترل به چه معنی است؟",
      "answers_fa": [
          "اینکه سیستم کنترل پویایی خودرو (ESC, ESP, DSC, ...) فعال است",
          "اینکه دمای آب خنک کننده خیلی کم است",
          "اینکه کروز کنترل فعال است",
          "اینکه فرمان کمکی از کار افتاده است"
      ],
      "correct_answers_fa": [
          "اینکه سیستم کنترل پویایی خودرو (ESC, ESP, DSC, ...) فعال است"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "2499",
      "question_text": "Sie fahren mit Ihrem PKW. Wie werden Sie sich verhalten, wenn diese Kontrollleuchte blinkt?",
      "answers": [
          "Ich gebe Vollgas",
          "Ich werde Gas wegnehmen und langsamer weiterfahren",
          "Ich werde die von der Kontrollleuchte dargestellten Lenkanweisungen befolgen",
          "Ich werde die Fahrdynamikregelung (ESC, ESP, DSC, ...) ausschalten, da sie defekt ist"
      ],
      "correct_answers": [
          "Ich werde Gas wegnehmen und langsamer weiterfahren"
      ],
      "question_text_fa": "شما با خودروی خود رانندگی می‌کنید. چگونه عمل می‌کنید اگر این چراغ کنترل چشمک بزند؟",
      "answers_fa": [
          "گاز را تا انتها فشار می‌دهم",
          "گاز را کم می‌کنم و آهسته‌تر به رانندگی ادامه می‌دهم",
          "دستورالعمل‌های ارائه شده توسط چراغ کنترل را دنبال می‌کنم",
          "سیستم کنترل پویایی خودرو (ESC, ESP, DSC, ...) را خاموش می‌کنم چون خراب است"
      ],
      "correct_answers_fa": [
          "گاز را کم می‌کنم و آهسته‌تر به رانندگی ادامه می‌دهم"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "2519",
      "question_text": "Was bedeutet es, wenn diese Kontrollleuchte aufleuchtet?",
      "answers": [
          "Dass die Fahrdynamikregelung (ESC, ESP, DSC, ...) außer Betrieb ist",
          "Dass die Fahrbahn rutschig ist",
          "Dass der Tempomat eingeschaltet ist",
          "Dass der nächste Wartungsdienst fällig ist"
      ],
      "correct_answers": [
          "Dass die Fahrdynamikregelung (ESC, ESP, DSC, ...) außer Betrieb ist"
      ],
      "question_text_fa": "این چراغ کنترل به چه معناست وقتی روشن می‌شود؟",
      "answers_fa": [
          "اینکه سیستم کنترل پویایی خودرو (ESC, ESP, DSC, ...) غیر فعال است",
          "اینکه سطح جاده لغزنده است",
          "اینکه کروز کنترل فعال است",
          "اینکه زمان سرویس بعدی فرا رسیده است"
      ],
      "correct_answers_fa": [
          "اینکه سیستم کنترل پویایی خودرو (ESC, ESP, DSC, ...) غیر فعال است"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  },
  {
      "question_number": "2520",
      "question_text": "Wie verhalten Sie sich, wenn diese Kontrollleuchte aufleuchtet?",
      "answers": [
          "Ich überprüfe, ob ich die Fahrdynamikregelung (ESC, ESP, DSC, ...) versehentlich ausgeschaltet habe",
          "Ich werde beim nächsten Jahresservice den Auftrag erteilen, den Fehler zu beheben",
          "Ich lasse sofort Winterreifen montieren",
          "Ich halte an einer geeigneten Stelle an und folge den Anweisungen der Betriebsanleitung"
      ],
      "correct_answers": [
          "Ich überprüfe, ob ich die Fahrdynamikregelung (ESC, ESP, DSC, ...) versehentlich ausgeschaltet habe",
          "Ich halte an einer geeigneten Stelle an und folge den Anweisungen der Betriebsanleitung"
      ],
      "question_text_fa": "چگونه عمل می‌کنید اگر این چراغ کنترل روشن شود؟",
      "answers_fa": [
          "بررسی می‌کنم که آیا سیستم کنترل پویایی خودرو (ESC, ESP, DSC, ...) را به طور تصادفی خاموش کرده‌ام",
          "در سرویس سالانه بعدی دستور می‌دهم که مشکل برطرف شود",
          "بلافاصله لاستیک‌های زمستانی نصب می‌کنم",
          "در یک مکان مناسب توقف می‌کنم و دستورالعمل‌های دفترچه راهنما را دنبال می‌کنم"
      ],
      "correct_answers_fa": [
          "بررسی می‌کنم که آیا سیستم کنترل پویایی خودرو (ESC, ESP, DSC, ...) را به طور تصادفی خاموش کرده‌ام",
          "در یک مکان مناسب توقف می‌کنم و دستورالعمل‌های دفترچه راهنما را دنبال می‌کنم"
      ],
      "category": "B - Fahrdynamik, Bremsanlage"
  }
]



// Function to sanitize the entire question object
const sanitizeQuestion = (question) => {
  let type = null;
  if (question.category && question.category.includes("GW -")) {
    type = "GW";
  } else if (question.category && question.category.includes("B -")) {
    type = "B";
  }
  return {
    ...question,
    question_text: sanitizeString(question.question_text),
    answers: question.answers ? question.answers.map(sanitizeString) : [],
    correct_answers: question.correct_answers
      ? question.correct_answers.map(sanitizeString)
      : [],
    question_text_fa: sanitizeString(question.question_text_fa),
    answers_fa: question.answers_fa
      ? question.answers_fa.map(sanitizeString)
      : [],
    correct_answers_fa: question.correct_answers_fa
      ? question.correct_answers_fa.map(sanitizeString)
      : [],
    type: type,
  };
};

// Function to check if multiple questions exist in the table
const checkExistingQuestions = async (questionNumbers) => {
  const { data, error } = await supabase
    .from("question")
    .select("question_number")
    .in("question_number", questionNumbers);

  if (error) {
    console.error("Error checking if questions exist:", error);
    return [];
  }

  return data.map((q) => q.question_number); // Return an array of existing question numbers
};

// Function to insert data into the `question` table
export const insertQuestions = async () => {
  try {
    // Sanitize all questions
    const sanitizedQuestions = questions.map(sanitizeQuestion);

    // Extract question numbers for existence check
    const questionNumbers = sanitizedQuestions.map((q) => q.question_number);

    // Check which questions already exist in the database
    const existingQuestionNumbers = await checkExistingQuestions(questionNumbers);

    // Filter out questions that already exist in the database
    const questionsToInsert = sanitizedQuestions.filter(
      (question) => !existingQuestionNumbers.includes(question?.question_number)
    );

    console.log("Questions to insert:", questionsToInsert);
    console.log("Insert started");

    // Insert questions in batches (optional, but recommended for large datasets)
    const batchSize = 100; // Adjust the batch size as needed
    for (let i = 0; i < questionsToInsert.length; i += batchSize) {
      const batch = questionsToInsert.slice(i, i + batchSize);
      const { data, error } = await supabase
        .from("question")
        .insert(batch);

      if (error) {
        console.error("Error inserting questions:", error);
      } else {
        console.log("Questions inserted successfully:", data);
      }
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};
