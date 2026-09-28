document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.getElementById("chaptersNav");
  const mainContent = document.getElementById("mainContent");
  const themeToggle = document.getElementById("themeToggle");

  // تبديل الثيم الداكن / الفاتح
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "light") {
      document.documentElement.setAttribute("data-theme", "dark");
      themeToggle.textContent = "☀️ الثيم الفاتح";
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      themeToggle.textContent = "🌙 الثيم الداكن";
    }
  });

  // إنشاء دوائر الفصول (من 1 إلى 10)
  for (let i = 1; i <= 10; i++) {
    const circle = document.createElement("div");
    circle.className = i === 1 ? 'chapter-circle active' : 'chapter-circle';
    circle.textContent = i;
    circle.addEventListener("click", () => {
      document.querySelectorAll(".chapter-circle").forEach(c => c.classList.remove("active"));
      circle.classList.add("active");
      loadChapter(i);
    });
    navContainer.appendChild(circle);
  }

  // دالة لجلب وعرض الفصل من ملف JSON الخاص به
  async function loadChapter(chapterNum) {
    try {
      const response = await fetch("data/chapter" + chapterNum + ".json");
      if (!response.ok) throw new Error("تعذر تحميل ملف الفصل");
      const data = await response.json();
      
      let questionsHTML = "";
      data.questions.forEach((q, idx) => {
        let optionsContent = "";

        if (q.type === 'tf') {
          optionsContent = '<div class="options-list" id="q-options-' + idx + '">' +
            '<button class="option-btn" onclick="checkAnswer(' + idx + ', true, ' + q.answer + ', \'' + (q.correction || '') + '\', this)">صح (True)</button>' +
            '<button class="option-btn" onclick="checkAnswer(' + idx + ', false, ' + q.answer + ', \'' + (q.correction || '') + '\', this)">خطأ (False)</button>' +
          '</div>';
        } else {
          optionsContent = '<ul class="options-list" id="q-options-' + idx + '">';
          q.options.forEach((opt, oIdx) => {
            optionsContent += '<li><button class="option-btn" onclick="checkAnswer(' + idx + ', ' + oIdx + ', ' + q.answer + ', \'' + (q.correction || '') + '\', this)">' + opt + '</button></li>';
          });
          optionsContent += '</ul>';
        }

        questionsHTML += '<div class="question-item" id="question-box-' + idx + '">' +
          '<p><strong>س' + (idx + 1) + ':</strong> ' + q.question + '</p>' +
          optionsContent +
          '<div id="feedback-' + idx + '"></div>' +
        '</div>';
      });

      mainContent.innerHTML = '<div class="content-card">' +
        '<h2>' + data.title + '</h2>' +
        '<div class="summary-box">' +
          '<h3>الملخص العميق والشامل:</h3>' +
          '<p>' + data.summary + '</p>' +
        '</div>' +
        '<h3>أسئلة واختبارات الفصل (10 أسئلة متنوعة):</h3>' +
        '<div style="margin-top: 15px;">' +
          questionsHTML +
        '</div>' +
      '</div>';

    } catch (error) {
      mainContent.innerHTML = '<div class="content-card">' +
        '<h2>عذراً</h2>' +
        '<p>جاري إعداد محتوى هذا الفصل أو أن ملف الجيسون غير موجود في مجلد data/chapter' + chapterNum + '.json</p>' +
      '</div>';
    }
  }

  // تحميل الفصل الأول افتراضياً عند فتح الموقع
  loadChapter(1);
});

// دالة التحقق الفوري من الإجابة داخل بلوك السؤال
window.checkAnswer = function(qIdx, selectedVal, correctVal, correctionText, btnElement) {
  const optionsContainer = document.getElementById('q-options-' + qIdx);
  const feedbackContainer = document.getElementById('feedback-' + qIdx);
  
  const allBtns = optionsContainer.querySelectorAll('.option-btn');
  allBtns.forEach(b => b.disabled = true);

  const isCorrect = (selectedVal === correctVal);

  if (isCorrect) {
    btnElement.classList.add('correct');
    feedbackContainer.innerHTML = '<div class="feedback-msg correct">إجابة صحيحة أحسنت!</div>';
  } else {
    btnElement.classList.add('incorrect');
    
    allBtns.forEach(b => {
      if (b.getAttribute('onclick').includes(correctVal)) {
        b.classList.add('correct');
      }
    });

    feedbackContainer.innerHTML = '<div class="feedback-msg incorrect">' +
      'إجابة خاطئة.<br>' +
      (correctionText ? '<span>' + correctionText + '</span>' : '') +
    '</div>';
  }
};