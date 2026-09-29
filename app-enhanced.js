document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.getElementById("chaptersNav");
  const mainContent = document.getElementById("mainContent");
  const themeToggle = document.getElementById("themeToggle");

  // ---------------------------------------------------------
  // الإعدادات
  // ---------------------------------------------------------
  const CHAPTER_COUNT = 10;
  const DATA_PATH = "data/chapter";

  // جداول مرجعية مأخوذة من محتوى الملخص نفسه، هدفها تحسين العرض فقط.
  const REFERENCE_TABLES = {
    1: {
      "استعراض معلومات المكتب": [
        {
          title: "إدخالات استعراض المكتب",
          columns: ["الإدخال", "الاستخدام"],
          rows: [
            ["PV", "استعراض معلومات المكتب الخاص بنا."],
            ["PV/DAMYB1234", "استعراض معلومات مكتب آخر، باستخدام رمز المدينة DAM ورمز سورية YB ورقم المكتب 1234."],
            ["PV/123456", "استعراض معلومات المكتب عن طريق رقم الأياتا."]
          ]
        },
        {
          title: "اختصارات المدن والبلدان الواردة",
          columns: ["الرمز", "المعنى"],
          rows: [["BEY", "بيروت Beirut"], ["LB", "لبنان Lebanon"], ["AMM", "عمّان Amman"], ["JO", "الأردن Jordan"]]
        }
      ],
      "نظام المساعدة الفوري": [
        {
          title: "أوامر المساعدة",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["HE", "وصف كامل ومفصل للإدخالات والخيارات المتاحة."], ["HE AN", "طلب المساعدة المتعلقة بإمكانية حجز تذكرة على رحلة."], ["HE NAME", "طلب المساعدة لتنزيل اسم الراكب."]]
        }
      ],
      "استعراض صفحات معلومات نظام أماديوس": [
        {
          title: "إدخالات GGAIS",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["GGAIS", "عرض القائمة الرئيسية للمعلومات."], ["GGAPTDXB", "عرض معلومات مطار دبي."], ["GGAIRAF", "عرض معلومات الخطوط الفرنسية."], ["GGAIRSV BAGS", "عرض شروط الأمتعة على الخطوط السعودية."], ["GGWEAPAR", "عرض معلومات الطقس في باريس."], ["HE GG", "إيجاد إدخالات جديدة."]]
        },
        {
          title: "التنقل ضمن صفحة المستند",
          columns: ["الرمز", "الاستخدام"],
          rows: [["MD", "الانتقال إلى الصفحة التالية."], ["MU", "الانتقال إلى الصفحة الأعلى."], ["MB", "الانتقال إلى آخر الصفحة."], ["MT", "الانتقال إلى أول الصفحة."], ["MS 104", "الانتقال إلى سطر معين ضمن الموضوع."]]
        }
      ],
      "الوقت والتاريخ في نظام أماديوس": [
        {
          title: "إدخالات الوقت والتاريخ",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["DD", "عرض الوقت والتاريخ الحالي في النظام."], ["DDPAR", "عرض وقت وتاريخ اليوم في مدينة معينة."], ["DDDAM/PAR", "عرض اختلاف الوقت بين مدينتين."], ["DD10AUG/12", "عرض اليوم والتاريخ بعد تاريخ معين."], ["DD10AUG/-12", "عرض اليوم والتاريخ قبل تاريخ معين."], ["DD20AUG/08SEP", "عرض عدد الأيام بين تاريخين معينين."]]
        }
      ],
      "العمليات الحسابية HE DF": [
        {
          title: "العمليات الحسابية",
          columns: ["الإدخال", "العملية"],
          rows: [["DF100;20;22", "الجمع."], ["DF456-123", "الطرح."], ["DF150*5", "الضرب."], ["DF9000/18", "القسمة."], ["DF515P20", "حساب النسبة المئوية."]]
        }
      ],
      "أدلة المطار": [
        {
          title: "أوامر أدلة المطار",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["DAN DAMASCUS", "معرفة رمز مطار أو مدينة دمشق."], ["DAN PARIS", "معرفة رمز مطار أو مدينة باريس."], ["HEDAN", "معرفة إدخالات أخرى لخدمة DAN."], ["HEDAC", "تحويل رمز المطار أو المدينة إلى الاسم بالكامل."], ["HEDNA", "تحويل أسماء شركات الطيران ورموزها."], ["HEDNE", "تحويل أسماء الطائرات ورموزها."]]
        },
        {
          title: "أنواع الدلالات في نتيجة DAN PARIS",
          columns: ["الرمز", "المعنى"],
          rows: [["R", "RAIL"], ["S", "ASSOC"], ["A", "APT"], ["B", "BUS"], ["C", "CITY"], ["G", "GRD TOWN"], ["H", "HELI"], ["O", "OFF-PT"]]
        },
        {
          title: "أمثلة HEDAC / HEDNA / HEDNE",
          columns: ["الإدخال", "الناتج أو الاستخدام"],
          rows: [["DAC DAM", "مطار دمشق."], ["DAC PAR", "مطار باريس."], ["DNA AIR FRANCE", "اسم الشركة: AIR FRANCE."], ["DNA AF", "كود الطيران الفرنسي AF."], ["DNA 057", "كود رقم التذكرة."], ["DNE 318", "AIRBUS A318؛ طراز الطائرة 318؛ عدد المقاعد 107–117؛ JET."]]
        }
      ]
    },
    2: {
      "إمكانية عرض الرحلة": [
        {
          title: "البيانات الظاهرة في شاشة AN",
          columns: ["البيان", "المثال الوارد"],
          rows: [["عدد الأيام المتبقية", "217"], ["تاريخ ويوم السفر", "15 TH JUN"], ["رقم السطر", "1"], ["شركة الطيران الناقلة", "QR"], ["رقم الرحلة", "803"], ["درجة الحجز", "J9 و C9 وغيرها"], ["مؤشر توفر آخر مقعد", "/"], ["نقطة الإقلاع والوصول", "BEY DOH"], ["رقم مبنى المطار", "1 عند ظهوره"], ["أوقات الإقلاع والهبوط", "0205 0530"], ["شرط إصدار التذكرة", "E"], ["عدد مرات التوقف غير المعلن", "0"], ["مؤشر الدخول إلى نظام شركة الطيران", "/"], ["طراز الطائرة", "788"], ["الوقت الإجمالي", "3:25"]]
        }
      ],
      "إدخالات تسهيل عرض الرحلة والبحث عنها": [
        {
          title: "إدخالات البحث والعرض",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["AN 15 JAN BEY DOH /A QR", "استعراض إمكانية شركة طيران معينة."], ["AN 15 JAN BEY DOH /C M,Q", "استعراض إمكانية درجة معينة من المقاعد."], ["AN 15 JAN BEY DOH /B8", "استعراض إمكانية لعدد معين من المقاعد."], ["AN 15 JAN BEY KUL/ X DOH", "استعراض إمكانية الرحلة عن طريق نقطة معينة (ترانزيت)."], ["MN", "عرض الرحلة بعد يوم من التاريخ الحالي."], ["MY", "عرض الرحلة قبل يوم من التاريخ الحالي."], ["AC6", "عرض الرحلة بعد 6 أيام من التاريخ الحالي."], ["AC-6", "عرض الرحلة قبل 6 أيام من التاريخ الحالي."]]
        }
      ],
      "إمكانية رحلة مزدوجة": [
        {
          title: "رحلة الذهاب والإياب",
          columns: ["العنصر", "الشرح"],
          rows: [["* + تاريخ العودة", "يوضعان في نهاية الإدخال لطلب رحلة ذهاباً وإياباً."], ["AN 19 JAN BEY DXB * 23 JAN", "مثال الإدخال الوارد في المقرر."], ["رقم بداية العودة", "11 في المثال."], ["شكل العرض", "شاشة مقسمة إلى قسمين للذهاب والإياب."]]
        }
      ],
      "عرض جدول مواعيد الرحلات": [
        {
          title: "إدخالات جدول المواعيد",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["TN BEY PAR", "جدول المواعيد لجميع الشركات."], ["TN BEY PAR/A AF", "جدول المواعيد لشركة محددة."], ["TN 15 JAN BEY PAR/A AF", "جدول المواعيد لشركة محددة مع تاريخ معين."]]
        }
      ],
      "حجز الطيران Booking Elements": [
        {
          title: "عناصر الحجز الأساسية",
          columns: ["العنصر", "المعنى"],
          rows: [["NM", "اسم الراكب."], ["SS", "خط سير الرحلة."], ["AP", "التلفون."], ["TK", "إعدادات التذكرة."], ["RF A + ER", "الشخص المتصل وإنهاء الملف."]]
        }
      ],
      "اسم الراكب NAME": [
        {
          title: "إدخالات الاسم",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["HE NM", "إضافة أسماء المسافرين في سجل اسم المسافر."], ["NM1 DEBO/TAREK MR", "مسافر واحد."], ["NM2 DEBO/TAREK MR/LAMA MRS", "مسافران باسم العائلة نفسها."], ["NM1 DEBO/TAREK MR + 1GHAZAL/LAMA MRS", "مسافران من عائلتين مختلفتين."]]
        },
        {
          title: "CHD و INF",
          columns: ["الرمز", "المذكور في المقرر"],
          rows: [["CHD", "طفل مسافر ويجب أن يتضمن تاريخ الميلاد."], ["INF", "رضيع ويجب أن يتضمن تاريخ الميلاد."]]
        }
      ],
      "خط سير الرحلة Itinerary وبيع المقاعد": [
        {
          title: "بيع المقاعد",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["HE SS", "مساعدة عنصر بيع المقعد."], ["SS1K1", "شراء مقعد واحد على الدرجة K من الرحلة الأولى."], ["SS2K2", "شراء مقعدين على الدرجة K من الرحلة الثانية."], ["SS1KL1", "شراء مقعد واحد بدرجتين مختلفتين لكل رحلة."]]
        }
      ],
      "الهاتف AP وإعدادات التذاكر TK": [
        {
          title: "الهاتف وإعدادات التذكرة",
          columns: ["الإدخال/الرمز", "الاستخدام"],
          rows: [["AP", "إضافة معلومات الاتصال الهاتفي."], ["H", "منزل."], ["E", "إيميل المسافر."], ["B", "المكتب."], ["HE TK", "مساعدة إعداد التذاكر."], ["TKOK", "إظهار تاريخ إنشاء الحجز واسم المكتب ثم المدة المحددة لإصدار التذكرة."]]
        }
      ],
      "اسم المستخدم RF وإنهاء سجل الحجز ER": [
        {
          title: "RF و ER",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["HE RF", "مساعدة اسم المستخدم."], ["RF AHMED", "تخزين اسم منشئ الحجز."], ["RF A", "تخزين أول حرف من اسم منشئ الحجز."], ["ET", "إنهاء سجل الحجز وإغلاقه."], ["ER", "إنهاء سجل الحجز وإغلاقه ثم إعادة عرض السجل."], ["ETK", "إنهاء وإغلاق وحفظ مع تحديث رموز حالة الحجز."], ["ERK", "إنهاء وإغلاق وإعادة عرض السجل مع تحديث رموز حالة الحجز."]]
        }
      ],
      "رفض العملية وتجاهلها Ignore Transaction": [
        {
          title: "تجاهل التعديلات",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["IG", "إنهاء كل الإضافات أو التعديلات وتجاهلها في سجل الحجز."], ["IR", "إنهاء سجل الحجز وتجاهله وإعادة عرض السجل لوضعه الأصلي."]]
        }
      ]
    },
    3: {
      "استعراض سجل حجز المسافر HE RT Display PNR": [
        {
          title: "إدخالات استعراض PNR",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["RT/FAMILY", "استعراض الحجز عن طريق اسم العائلة."], ["RT/A", "استعراض الحجز عن طريق أول حرف من اسم العائلة."], ["RTxxxxx", "استعراض الحجز عن طريق رقم الحجز."], ["RT1", "استعراض الحجز الأول من قائمة الحجوزات المستعرضة."], ["RT0", "العودة إلى قائمة الحجوزات المستعرضة."]]
        }
      ],
      "معلومات الرحلة Flight Information HE DO": [
        {
          title: "إدخالات معلومات الرحلة",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["DO1", "استعراض معلومات الرحلة عن طريق رقم السطر من شاشة AN."], ["DO4", "استعراض معلومات الرحلة عن طريق رقم السطر من داخل الحجز PNR."], ["DO AF565", "استعراض معلومات الرحلة مباشرة عن طريق رقم الرحلة والشركة الناقلة."]]
        },
        {
          title: "رموز معلومات الرحلة والوجبات",
          columns: ["الرمز", "المعنى"],
          rows: [["TTL", "TOTAL: الزمن الإجمالي للطيران الذي يتضمن ساعات الطيران وساعات توقف الطائرة على أرض المطار."], ["EFT", "Elapsed Flight Time: ساعات الطيران والوقت المستغرق في الطيران لكل اتجاه."], ["GRND", "Ground: ساعات توقف الطائرة على أرض المطار والوقت المستغرق للتوقف."], ["EQP", "Equipment: طراز الطائرة ورمز طرازها."], ["B", "إفطار"], ["K", "إفطار أوروبي"], ["L", "غداء"], ["D", "عشاء"], ["S", "وجبة خفيفة"], ["O", "وجبة باردة"], ["H", "وجبة ساخنة"], ["M", "وجبة غير محددة"], ["R", "مرطبات"], ["F", "طعام للشراء"]]
        }
      ],
      "الخدمات المطلوبة الخاصة Special Service Request": [
        {
          title: "SSR",
          columns: ["العنصر", "المذكور في المقرر"],
          rows: [["SR", "رمز العملية المستخدم لطلب أي خدمة خاصة."], ["SSR", "رموز الخدمات الخاصة تتكون من أربعة أحرف في الإدخال وهي معيار قياسي في صناعة النقل الجوي."]]
        }
      ],
      "الاختيار المسبق للمقاعد وطلب المقعد": [
        {
          title: "اختيار المقعد",
          columns: ["الإدخال/الرمز", "الاستخدام"],
          rows: [["HE ST", "الاختيار المسبق للمقاعد Advance Seat Selection."], ["ST/A/P3/S2", "مثال طلب المقعد؛ P لرقم المسافر وS لرقم السطر."], ["/A", "مقعد مجاور للممر Aisle Seat."], ["/W", "مقعد بجوار النافذة Window Seat."], ["/I", "مسافر مع رضيع Passenger with an Infant."], ["/C", "مقعد سلة للرضيع Crib."], ["/M", "موافقة طبية Medical Approval."]]
        }
      ],
      "خريطة المقاعد Seat Map HE": [
        {
          title: "أوامر خريطة المقاعد",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["SM3", "طلب خريطة المقاعد من داخل حجز المسافر، حيث 3 رقم السطر."], ["SM/3", "طلب خريطة المقاعد من عرض الإمكانية، حيث 3 رقم السطر."]]
        }
      ],
      "الوجبات Meals": [
        {
          title: "الوجبات",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["HE MEAL", "التعرف إلى الوجبات."], ["SR MOML", "وجبة حلال (مسلم) للركاب كافة ومقاطع الرحلة كافة."], ["SR VGML/P2", "وجبة نباتية للراكب رقم 2 ولمقاطع الرحلة كافة."], ["SR SFML/P2/S4", "وجبة مأكولات بحرية للراكب الثاني ولمقطع السفر 4."]]
        }
      ],
      "الكرسي المتحرك Wheelchair": [
        {
          title: "خدمات الكرسي المتحرك",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["SR WCHR", "طلب كرسي متحرك."], ["SR WCHR/P2", "طلب كرسي متحرك لراكب محدد."], ["SR WCHR - PAX CANNOT WALK LONG DISTANCE", "مثال لذكر سبب طلب الخدمة."], ["SR SR", "لمعرفة تفاصيل المقاعد وخدمات الكرسي المتحرك."]]
        }
      ],
      "كرسي طفل حديث الولادة Bassinet Seat": [
        {
          title: "كرسي طفل حديث الولادة",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["SR BSCT", "طلب كرسي لطفل حديث الولادة."], ["SR BSCT/P2", "طلبه للراكب رقم 2."]]
        }
      ],
      "المسافر الدائم Frequent Flyer": [
        {
          title: "بطاقة الأميال",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["FFD YY-1234567", "عرض معلومات اسم المسافر برقم عضوية على شركة طيران معينة."], ["FFN YY-1234567", "إضافة رقم بطاقة الأميال لشركة معينة من داخل الحجز بعد إنشاء الحجز."], ["FFA YY-1234567", "استعراض وإضافة عنصر الاسم ورقم الأميال أثناء إنشاء الحجز."], ["SR FQTV HK YY/-YY1234567", "إضافة رقم بطاقة الأميال يدوياً عند فشل التحقق من الاسم أو رقم البطاقة."], ["VFFD YY", "معرفة الاتفاقيات بين شركات الطيران لاستخدام بطاقة الأميال."]]
        }
      ],
      "إرسال أو طباعة الحجز": [
        {
          title: "إرسال وطباعة الحجز",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["IEP- EML-XXX@XXX", "إرسال الحجز بالتفصيل مع الطلبات كافة لكل مسافر."], ["IEPJ- EML-XXX@XXX", "إرسال الحجز بالتفصيل مع الطلبات كافة لجميع المسافرين."], ["WM/FWD/EML XXX@XXX/RT", "إرسال الحجز من شاشة نظام أماديوس."], ["WRA", "طباعة سجل الحجز كاملاً."], ["WRS", "طباعة الشاشة الأولى من عرض سجل حجز المسافر."]]
        }
      ],
      "تعديل حجز الراكب PNR Modification": [
        {
          title: "إلغاء عناصر الحجز",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["XE3", "إلغاء السطر 3."], ["XE5,6", "إلغاء السطرين 5 و6."], ["XE3-5", "إلغاء من السطر 3 إلى السطر 5."], ["XE3,4,5-12", "إلغاء أسطر عدة من الفئة نفسها."], ["XI", "إلغاء كامل سير الحجز."]]
        }
      ],
      "فصل الحجز SPLIT PNR HE SP": [
        {
          title: "خطوات فصل الحجز في المثال",
          columns: ["الخطوة", "الإدخال"],
          rows: [["1", "SP3"], ["2", "RFL"], ["3", "EF End Transaction or End File"], ["4", "RFL; ER"]]
        },
        {
          title: "تحذير الخدمات المطلوبة",
          columns: ["النص الوارد في المقرر", "المعالجة المذكورة"],
          rows: [["WARNING: MISSING SSR CTCM MOBILE OR SSR CTCE EMAIL OR SSR CTCR NON-CONSENT FOR ME", "يجب إضافة رقم الهاتف ثم إغلاق ملف الحجز، وفي بعض الشركات يجب إدخال إيميل الراكب ورقم هاتفه ثم حفظ التغييرات وإنهاء الملف مرة أخرى."]]
        }
      ]
    },
    4: {
      "تسعير خط الرحلة": [
        {
          title: "أوامر التسعير الأساسية",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["FXB / FXP", "تسعير خط الرحلة مع إمكانية حفظ السعر في TST."], ["FXR / FXX / FXL", "تسعير خط الرحلة وعدم حفظ السعر، أي مجرد استعراض السعر."]]
        }
      ],
      "مقارنة أوامر التسعير في PNR وNo PNR": [
        {
          title: "مقارنة أوامر التسعير",
          columns: ["الأمر", "الحالة", "المذكور في المقرر"],
          rows: [["FXP", "في PNR", "تسعير الدرجة الحالية للحجز كما هي دون تغيير في درجات الحجز، ويحفظ السعر، ويعطي درجات بديلة فقط إذا لم تتوافر الدرجة الحالية."], ["FXX", "No PNR", "تسعير الدرجة الحالية كما هي ولا يحفظ السعر، ويعطي درجات بديلة فقط إذا لم تتوافر الدرجة الحالية."], ["FXB", "في PNR", "يغير درجة الحجز إلى أرخص سعر تتوافر عليه مقاعد ويحفظ السعر."], ["FXR", "No PNR", "يغير درجة الحجز لأرخص سعر تتوافر عليه مقاعد ولا يحفظ السعر."], ["FXL", "No PNR", "يعرض أرخص سعر مطبق لهذه الرحلة بغض النظر عن توافر الأماكن أو عدمها، وهو للاستعراض فقط."], ["FQQ3", "تفاصيل السعر", "عرض تفاصيل السعر رقم 3 عند عرض أكثر من سعر."]]
        }
      ],
      "خيارات التسعير بحسب الحالة": [
        {
          title: "خيارات التسعير",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["FXX/P1,3", "تسعير الراكب الأول والثالث."], ["FXX/S2-4", "تسعير من السطر 2 إلى 4."], ["FXX/R,21jan22", "تسعير بتاريخ قديم."], ["FXX/R, FC-USD", "تسعير بعملة معينة."], ["FXX/R, BEY", "تسعير من بلد معين."], ["FXX/R, VC-ME", "تسعير بسعر شركة معينة."], ["FXX/RCH", "تسعير الطفل."], ["FXX/INF", "تسعير الرضيع فقط."], ["FXX/PAX", "تسعير كل الركاب عدا الرضيع، أي كل من لديه مقعد."]]
        }
      ],
      "مخزن أسعار التذاكر TST": [
        {
          title: "استعراض مخزن الأسعار",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["TQT", "استعراض ملف السعر."], ["TQT/T1", "استعراض ملف السعر الأول فقط."]]
        }
      ],
      "شروط الحجز Fare Note": [
        {
          title: "قراءة شروط التذكرة",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["FXX / FXR / FXP / FXB / FXL", "يمكن البدء بأي إدخال من عناصر التسعير لمعرفة شروط التذكرة."], ["FQN1", "الخطوة الثانية بعد FXB في المثال المذكور لمعرفة شروط التذكرة."]]
        }
      ],
      "حذف مخزن الأسعار Deleting TST HE TTE": [
        {
          title: "حذف مخزن الأسعار",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["TTE/ALL", "حذف الملفات كافة إذا كان الحجز يحتوي على أكثر من مسافر."], ["TTE/T2", "حذف الملف الثاني فقط مع إبقاء تسعير باقي المخزون."], ["Deleted TST", "القسم الذي تظهر فيه مخازن أسعار التذاكر المحذوفة."], ["T", "رقم التسعير TST Number."], ["P/S", "رقم الراكب Passenger Number."]]
        }
      ]
    },
    5: {
      "أهم أرقام الكيوزات ووظائفها": [
        {
          title: "أرقام الكيوزات",
          columns: ["الرقم / الاسم", "الوظيفة"],
          rows: [["1 CONFO", "التأكيد على قطاعات الحجز أو الخدمات؛ US KK UU UN NO UC وتحويل رموز الحالة إلى HK HL DL DK."], ["2 KL", "حجوزات تم تأكيدها من قائمة الانتظار؛ KL وتحويل الحالة إلى HK."], ["3 OPTON", "عناصر اختيارية تم إدخالها في سجل حجز المسافر."], ["4 RPCHANG", "سجل اسم المسافر الذي تم تحويله في سجل حجز المسافر."], ["7 SCHEDULE CHANGES", "تغيير جداول الرحلات من قبل شركات الطيران."], ["8 TKTG", "المهلة الزمنية لإصدار التذاكر المذكورة في عنصر TK."], ["12 XTL", "المهلة الزمنية المنتهية؛ لا يتم إلغاء سجل الحجز إذا انتهت المهلة الزمنية."]]
        }
      ],
      "الإدخالات والاستخدامات في بيئة الكيوزات": [
        {
          title: "إدخالات الكيوزات",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["QTQ", "استعراض جميع الكيوزات الموجودة."], ["QT", "استعراض فقط الكيوزات التي تحوي حجوزات."], ["QS 6 C1", "بدء العمل على كيوز معين."], ["QN", "إخراج حجز معين من الكيوز."], ["QD", "تأخير استعراض حجز ضمن الكيوز."], ["QI", "الخروج من الكيوزات بشكل عام."], ["QE 55", "وضع حجز في كيوز معين."]]
        }
      ],
      "الفئات Category": [
        {
          title: "تصنيف الفئات",
          columns: ["الرقم", "الفئة"],
          rows: [["1", "القطاعات الجوية Air Segments"], ["2", "قطاعات الفنادق Hotel Segments"], ["3", "قطاعات السيارات Car Segments"], ["4", "قطاعات الجولات Tour Segments"], ["5", "قطاعات الخدمات الخاصة SSRs"], ["6", "إنشاء كيوز خاص بموظف الحجز Create Queues"]]
        }
      ],
      "إنشاء وتسمية وفتح الكيوز": [
        {
          title: "إنشاء وتسمية وفتح الكيوز",
          columns: ["الإدخال", "الاستخدام"],
          rows: [["QA 55 C3", "إنشاء الكيوز رقم 55 للفئة 3."], ["QTQ", "استعراض الكيوزات واختيار الرقم المتاح."], ["QAN 55 C0 VIP", "تسمية الفئة بالمثال VIP."], ["QAN 55 C1 Star Company", "تسمية الفئة بالمثال Star Company."], ["QC 55 CE", "فتح الكيوز الخاص بموظف الحجز مباشرة."], ["QK 55", "تجميد الكيوز؛ لا يمكن حذفه أو مسحه."], ["QE 55", "وضع الحجز في General Queue."], ["QE 55 C1", "وضع الحجز في Category 1."]]
        }
      ],
      "تحويل الحجز Element Security": [
        {
          title: "صلاحيات تحويل الحجز",
          columns: ["الإدخال", "الصلاحية"],
          rows: [["ES DAMYB1234-R", "R READ ONLY: القراءة فقط دون إمكانية التعديل."], ["ES DAMYB1234-T", "T TICKETING ONLY: إصدار التذكرة فقط."], ["ES DAMYB1234-B", "B BOTH READ & WRITE: استعراض الحجز والتعديل عليه."], ["ES DAMYB1234-B,AMMJO1234-R,BEYLB1234-T", "منح صلاحيات لمكاتب عدة وبمستويات مختلفة."], ["ESX", "إلغاء الصلاحيات كافة الممنوحة للمكاتب الأخرى."]]
        }
      ]
    }
  };

  // ---------------------------------------------------------
  // الثيم
  // ---------------------------------------------------------
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const nextTheme = currentTheme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", nextTheme);
      themeToggle.textContent = nextTheme === "light" ? "🌙 الثيم الداكن" : "☀️ الثيم الفاتح";
    });
  }

  // ---------------------------------------------------------
  // أزرار الفصول
  // ---------------------------------------------------------
  for (let i = 1; i <= CHAPTER_COUNT; i++) {
    const circle = document.createElement("div");
    circle.className = i === 1 ? "chapter-circle active" : "chapter-circle";
    circle.textContent = i;
    circle.setAttribute("role", "button");
    circle.setAttribute("tabindex", "0");
    circle.setAttribute("aria-label", `الفصل ${i}`);

    const activate = () => {
      document.querySelectorAll(".chapter-circle").forEach(c => c.classList.remove("active"));
      circle.classList.add("active");
      loadChapter(i);
    };

    circle.addEventListener("click", activate);
    circle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate();
      }
    });

    navContainer.appendChild(circle);
  }

  // ---------------------------------------------------------
  // أدوات تنسيق الملخص
  // ---------------------------------------------------------
  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalizeHeading(text) {
    return String(text || "")
      .replace(/&amp;/g, "&")
      .replace(/^\s*(أولاً|ثانياً|ثالثاً|رابعاً|خامساً|سادساً|سابعاً|ثامناً|تاسعاً|عاشراً)\s*[:：–—-]?\s*/i, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function decorateInlineText(text) {
    const tokens = [
      "GGAIRSV BAGS", "GGAIS", "GGAPTDXB", "GGAIRAF", "GGWEAPAR", "HE GG",
      "PV/DAMYB1234", "PV/123456", "HE AN", "HE NAME", "HEDAN", "HEDAC", "HEDNA", "HEDNE",
      "AN 15 JAN BEY DOH /A QR", "AN 15 JAN BEY DOH /C M,Q", "AN 15 JAN BEY DOH /B8", "AN 15 JAN BEY KUL/ X DOH",
      "AN 19 JAN BEY DXB * 23 JAN", "TN BEY PAR/A AF", "TN BEY PAR", "TN 15 JAN BEY PAR/A AF",
      "NM1 DEBO/TAREK MR", "NM2 DEBO/TAREK MR/LAMA MRS", "SS1KL1", "SS2K2", "SS1K1", "TKOK",
      "RF AHMED", "RF A", "ETK", "ERK", "HE TK", "HE RF", "FXX/P1,3", "FXX/S2-4", "FXX/R,21jan22",
      "FXX/R, FC-USD", "FXX/R, BEY", "FXX/R, VC-ME", "FXX/RCH", "FXX/INF", "FXX/PAX", "TQT/T1",
      "TTE/ALL", "TTE/T2", "FQN1", "FQQ3", "QTQ", "QS 6 C1", "QE 55 C1", "QA 55 C3", "QAN 55 C0 VIP",
      "QAN 55 C1 Star Company", "QC 55 CE", "QK 55", "ESX", "ES DAMYB1234-B,AMMJO1234-R,BEYLB1234-T",
      "ES DAMYB1234-R", "ES DAMYB1234-T", "ES DAMYB1234-B", "RT/FAMILY", "RT/A", "RTxxxxx", "RT1", "RT0",
      "DO AF565", "DO1", "DO4", "ST/A/P3/S2", "SM/3", "SM3", "SR MOML", "SR VGML/P2", "SR SFML/P2/S4",
      "SR WCHR/P2", "SR WCHR", "SR BSCT/P2", "SR BSCT", "FFD YY-1234567", "FFN YY-1234567",
      "FFA YY-1234567", "SR FQTV HK YY/-YY1234567", "VFFD YY", "IEP- EML-XXX@XXX", "IEPJ- EML-XXX@XXX",
      "WM/FWD/EML XXX@XXX/RT", "WRA", "WRS", "XE3,4,5-12", "XE3-5", "XE5,6", "XE3", "XI", "SP3",
      "RFL; ER", "MD", "MU", "MB", "MT", "MS 104", "DDPAR", "DDDAM/PAR", "DD10AUG/12",
      "DD10AUG/-12", "DD20AUG/08SEP", "DF100;20;22", "DF456-123", "DF150*5", "DF9000/18", "DF515P20"
    ];

    // نستخدم placeholders حتى لا تدخل الرموز داخل بعضها عند تزيين النص.
    const placeholders = [];
    let prepared = String(text ?? "");
    tokens.sort((a, b) => b.length - a.length);

    for (const token of tokens) {
      const escapedToken = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const placeholder = `___CMD_${placeholders.length}___`;
      const rx = new RegExp(`(?<![\\w-])${escapedToken}(?![\\w-])`, "g");
      if (rx.test(prepared)) {
        prepared = prepared.replace(rx, placeholder);
        placeholders.push({ placeholder, token });
      }
    }

    let safe = escapeHTML(prepared);
    placeholders.forEach(({ placeholder, token }) => {
      safe = safe.replaceAll(placeholder, `<code class="cmd-chip">${escapeHTML(token)}</code>`);
    });
    return safe;
  }
  function renderReferenceTable(table) {
    const head = table.columns.map(col => `<th scope="col">${escapeHTML(col)}</th>`).join("");
    const body = table.rows.map(row => {
      return `<tr>${row.map((cell, idx) => {
        const isCommandCell = idx === 0 || /^(HE|PV|GG|DD|DF|AN|TN|NM|SS|AP|TK|RF|ER|ET|IG|IR|RT|DO|SR|ST|SM|FFD|FFN|FFA|IEP|WM|WR|XE|XI|SP|FXX|FXR|FXP|FXB|FXL|FQQ|TQ|TTE|Q|ES)/.test(String(cell));
        return `<td data-label="${escapeHTML(table.columns[idx] || "")}">${isCommandCell ? `<code class="cmd-cell">${escapeHTML(cell)}</code>` : escapeHTML(cell)}</td>`;
      }).join("")}</tr>`;
    }).join("");

    return `
      <div class="reference-block">
        <div class="reference-title">${escapeHTML(table.title)}</div>
        <div class="table-scroll">
          <table class="reference-table">
            <thead><tr>${head}</tr></thead>
            <tbody>${body}</tbody>
          </table>
        </div>
      </div>
    `;
  }

  function getSectionTables(chapterNum, heading) {
    const source = REFERENCE_TABLES[chapterNum] || {};
    const exact = source[heading];
    if (exact) return exact;

    const normalized = normalizeHeading(heading);
    const key = Object.keys(source).find(k => normalized.startsWith(normalizeHeading(k)) || normalizeHeading(k).startsWith(normalized));
    return key ? source[key] : [];
  }

  function renderSummary(chapterNum, summaryHtml) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div class="summary-source">${summaryHtml}</div>`, "text/html");
    const source = doc.querySelector(".summary-source");
    const nodes = [...source.children];

    const fragment = document.createDocumentFragment();
    let currentSection = null;

    const flushSection = () => {
      if (currentSection) fragment.appendChild(currentSection);
      currentSection = null;
    };

    for (const node of nodes) {
      if (node.tagName === "H3") {
        flushSection();
        const headingText = normalizeHeading(node.textContent);
        currentSection = document.createElement("section");
        currentSection.className = "summary-section";
        currentSection.dataset.heading = headingText;

        const heading = document.createElement("h3");
        heading.className = "summary-section-title";
        heading.innerHTML = `<span class="section-marker"></span>${escapeHTML(headingText)}`;
        currentSection.appendChild(heading);
        continue;
      }

      if (!currentSection) continue;
      if (node.tagName !== "P") continue;

      const rawText = node.textContent.trim();
      if (!rawText) continue;

      // معلومات الجلسة تعرض كعناصر مستقلة ومريحة للعين.
      const metaMatch = rawText.match(/^(مدة الجلسة|أهداف الجلسة|محتوى الجلسة|متطلبات الطالب|متطلبات مركز التدريب)\s*:\s*(.*)$/);
      if (metaMatch) {
        let metaBox = currentSection.querySelector(".session-meta");
        if (!metaBox) {
          metaBox = document.createElement("div");
          metaBox.className = "session-meta";
          currentSection.appendChild(metaBox);
        }
        const item = document.createElement("div");
        item.className = "meta-item";
        item.innerHTML = `<div class="meta-label">${escapeHTML(metaMatch[1])}</div><div class="meta-value">${decorateInlineText(metaMatch[2])}</div>`;
        metaBox.appendChild(item);
        continue;
      }

      const tables = getSectionTables(chapterNum, currentSection.dataset.heading || "");
      const hasReferenceContent = tables.length > 0 && /(?:HE |PV|GGA|GG|DD|DF|DAN|AN |TN |NM|SS|AP|TK|RF|ET|ER|IG|IR|RT|DO|SR |HE |ST|SM|FFD|FFN|FFA|IEP|WM|WRA|WRS|XE|XI|SP|FXX|FXR|FXP|FXB|FXL|FQQ|TQT|FQN|TTE|QTQ|QT |QS |QN|QD|QI|QE |QA |QAN |QC |QK |ES )/.test(rawText);

      if (hasReferenceContent) {
        let details = currentSection.querySelector(".source-details");
        if (!details) {
          details = document.createElement("details");
          details.className = "source-details";
          details.innerHTML = `<summary>تفاصيل المقرر الأصلية لهذا الجزء</summary><div class="source-details-body"></div>`;
          currentSection.appendChild(details);
        }
        const p = document.createElement("p");
        p.className = "summary-paragraph compact-source";
        p.innerHTML = decorateInlineText(rawText);
        details.querySelector(".source-details-body").appendChild(p);
        continue;
      }

      const p = document.createElement("p");
      p.className = "summary-paragraph";
      p.innerHTML = decorateInlineText(rawText);
      currentSection.appendChild(p);
    }

    flushSection();

    // إلحاق الجداول بعد كل قسم، وليس داخل details، للحفاظ على القراءة السريعة.
    [...fragment.children].forEach(section => {
      const tables = getSectionTables(chapterNum, section.dataset.heading || "");
      if (tables.length) {
        const box = document.createElement("div");
        box.className = "reference-tables";
        box.innerHTML = tables.map(renderReferenceTable).join("");
        section.appendChild(box);
      }
    });

    return fragment;
  }

  function buildQuestions(data) {
    return data.questions.map((q, idx) => {
      const isTrueFalse = q.type === "tf" || q.type === "true_false" || q.type === "truefalse";
      const options = Array.isArray(q.options) ? q.options : [];
      const correctValue = isTrueFalse ? Number(q.answer) : Number(q.answer);
      const questionId = `q-${idx}`;

      const optionButtons = isTrueFalse
        ? `
          <div class="options-list tf-options" id="q-options-${idx}">
            <button class="option-btn" data-q-idx="${idx}" data-selected="0" data-correct="${correctValue}">صح (True)</button>
            <button class="option-btn" data-q-idx="${idx}" data-selected="1" data-correct="${correctValue}">خطأ (False)</button>
          </div>
        `
        : `
          <div class="options-list" id="q-options-${idx}">
            ${options.map((opt, oIdx) => `<button class="option-btn" data-q-idx="${idx}" data-selected="${oIdx}" data-correct="${correctValue}">${escapeHTML(opt)}</button>`).join("")}
          </div>
        `;

      return `
        <div class="question-item" id="question-box-${idx}">
          <div class="question-number">س${idx + 1}</div>
          <div class="question-body">
            <p class="question-text">${escapeHTML(q.question)}</p>
            ${optionButtons}
            <div id="feedback-${idx}" class="feedback-container" aria-live="polite"></div>
          </div>
        </div>
      `;
    }).join("");
  }

  function attachQuestionHandlers() {
    document.querySelectorAll(".option-btn[data-q-idx]").forEach(btn => {
      btn.addEventListener("click", () => {
        const qIdx = Number(btn.dataset.qIdx);
        const selectedValue = Number(btn.dataset.selected);
        const correctValue = Number(btn.dataset.correct);
        checkAnswer(qIdx, selectedValue, correctValue, btn);
      });
    });
  }

  window.checkAnswer = function(qIdx, selectedVal, correctVal, btnElement) {
    const optionsContainer = document.getElementById(`q-options-${qIdx}`);
    const feedbackContainer = document.getElementById(`feedback-${qIdx}`);
    if (!optionsContainer || !feedbackContainer) return;

    const allBtns = [...optionsContainer.querySelectorAll(".option-btn")];
    allBtns.forEach(b => b.disabled = true);

    const isCorrect = selectedVal === correctVal;
    if (isCorrect) {
      btnElement.classList.add("correct");
      feedbackContainer.innerHTML = `<div class="feedback-msg correct">إجابة صحيحة، أحسنت!</div>`;
    } else {
      btnElement.classList.add("incorrect");
      const correctButton = allBtns.find(b => Number(b.dataset.selected) === correctVal);
      if (correctButton) correctButton.classList.add("correct");
      feedbackContainer.innerHTML = `<div class="feedback-msg incorrect">إجابة خاطئة.</div>`;
    }
  };

  // ---------------------------------------------------------
  // تحميل الفصل
  // ---------------------------------------------------------
  async function loadChapter(chapterNum) {
    mainContent.innerHTML = `
      <div class="content-card study-content loading-card">
        <div class="loading-spinner"></div>
        <p>جاري تحميل الفصل ${chapterNum}...</p>
      </div>
    `;

    try {
      const response = await fetch(`${DATA_PATH}${chapterNum}.json`, { cache: "no-cache" });
      if (!response.ok) throw new Error("تعذر تحميل ملف الفصل");
      const data = await response.json();

      const summaryContainer = document.createElement("div");
      summaryContainer.className = "enhanced-summary";
      summaryContainer.appendChild(renderSummary(chapterNum, data.summary));

      mainContent.innerHTML = `
        <div class="content-card study-content">
          <div class="chapter-heading">
            <div>
              <div class="chapter-kicker">ملخص المادة</div>
              <h2>${escapeHTML(data.title)}</h2>
            </div>
            <div class="chapter-badge">الفصل ${chapterNum}</div>
          </div>

          <div class="summary-box enhanced-summary-box">
            <div class="summary-box-head">
              <div>
                <span class="eyebrow">شرح منظم</span>
                <h3>الملخص</h3>
              </div>
              <span class="reading-note">قراءة مريحة + جداول مرجعية</span>
            </div>
            <div id="enhancedSummaryMount"></div>
          </div>

          <div class="quiz-heading">
            <div>
              <span class="eyebrow">اختبار الفصل</span>
              <h3>أسئلة متنوعة</h3>
            </div>
            <div class="quiz-count">${data.questions.length} سؤال</div>
          </div>
          <div class="questions-list">${buildQuestions(data)}</div>
        </div>
      `;

      document.getElementById("enhancedSummaryMount").appendChild(summaryContainer);
      attachQuestionHandlers();
    } catch (error) {
      console.error(error);
      mainContent.innerHTML = `
        <div class="content-card study-content error-card">
          <div class="error-icon">!</div>
          <h2>تعذر تحميل الفصل</h2>
          <p>تأكد من وجود الملف <code>data/chapter${chapterNum}.json</code> وأن الموقع يعمل عبر خادم محلي يدعم <code>fetch</code>.</p>
        </div>
      `;
    }
  }

  loadChapter(1);
});
