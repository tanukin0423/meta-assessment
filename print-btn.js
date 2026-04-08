/* ============================
   就活の木 PDF保存ボタン
   print-btn.js
   ============================ */

(function () {

  // 印刷用CSS（ボタンを非表示にする）
  const printStyle = document.createElement('style');
  printStyle.textContent = `
    @media print {
      #shukatsu-print-bar { display: none !important; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  `;
  document.head.appendChild(printStyle);

  // ボタンバーを作成
  function createPrintBar() {
    const bar = document.createElement('div');
    bar.id = 'shukatsu-print-bar';
    bar.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #ffffff;
      border-top: 2px solid #C8E6C9;
      padding: 12px 16px;
      display: flex;
      gap: 10px;
      justify-content: center;
      align-items: center;
      z-index: 9000;
      box-shadow: 0 -4px 16px rgba(44,95,45,0.12);
    `;

    // PDFで保存ボタン
    const pdfBtn = document.createElement('button');
    pdfBtn.innerHTML = '📄 結果をPDFで保存';
    pdfBtn.style.cssText = `
      background: linear-gradient(135deg, #2C5F2D, #4A8C4B);
      color: white;
      border: none;
      padding: 12px 22px;
      border-radius: 30px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      font-family: 'Noto Sans JP', sans-serif;
      box-shadow: 0 4px 12px rgba(44,95,45,0.25);
      transition: opacity 0.2s, transform 0.15s;
    `;
    pdfBtn.onmouseover = () => { pdfBtn.style.opacity = '0.88'; pdfBtn.style.transform = 'translateY(-1px)'; };
    pdfBtn.onmouseout  = () => { pdfBtn.style.opacity = '1';    pdfBtn.style.transform = 'translateY(0)'; };
    pdfBtn.onclick = function () {
      // スマホ・PCどちらでも動く印刷ダイアログ
      window.print();
    };

    // コピーボタン
    const copyBtn = document.createElement('button');
    copyBtn.innerHTML = '📋 結果をコピー';
    copyBtn.style.cssText = `
      background: #ffffff;
      color: #2C5F2D;
      border: 2px solid #4A8C4B;
      padding: 12px 22px;
      border-radius: 30px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      font-family: 'Noto Sans JP', sans-serif;
      transition: background 0.2s;
    `;
    copyBtn.onmouseover = () => { copyBtn.style.background = '#E8F5E9'; };
    copyBtn.onmouseout  = () => { copyBtn.style.background = '#ffffff'; };
    copyBtn.onclick = function () {
      // 結果エリアのテキストを取得してコピー
      const resultArea =
        document.querySelector('#result') ||
        document.querySelector('.result') ||
        document.querySelector('[id*="result"]') ||
        document.querySelector('[class*="result"]');

      const text = resultArea
        ? resultArea.innerText
        : document.body.innerText.substring(0, 1000);

      navigator.clipboard.writeText(text).then(() => {
        copyBtn.innerHTML = '✅ コピーしました！';
        setTimeout(() => { copyBtn.innerHTML = '📋 結果をコピー'; }, 2000);
      }).catch(() => {
        // フォールバック
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        copyBtn.innerHTML = '✅ コピーしました！';
        setTimeout(() => { copyBtn.innerHTML = '📋 結果をコピー'; }, 2000);
      });
    };

    // ブランドテキスト
    const brand = document.createElement('span');
    brand.textContent = '🌱 就活の木';
    brand.style.cssText = `
      font-size: 11px;
      font-weight: 700;
      color: #4A8C4B;
      position: absolute;
      right: 16px;
      bottom: 6px;
    `;

    bar.appendChild(pdfBtn);
    bar.appendChild(copyBtn);
    bar.appendChild(brand);

    // ボタンバーの高さ分、bodyに余白を追加
    document.body.style.paddingBottom = '80px';

    document.body.appendChild(bar);
  }

  // DOM読み込み完了後に実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createPrintBar);
  } else {
    createPrintBar();
  }

})();
