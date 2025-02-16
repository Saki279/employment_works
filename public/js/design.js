// Fabric.jsキャンバスの初期化
const canvas = new fabric.Canvas('canvas');


//キャンバス背景色
// canvas.setBackgroundColor('rgb(241,233,237)', () => {
//   canvas.renderAll();
// });
canvas.setBackgroundColor('rgb(255,255,255)', () => {
   canvas.renderAll();
 });


// アップロードされた画像をキャンバスに追加
const uploadInput = document.getElementById('upload');
uploadInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      fabric.Image.fromURL(e.target.result, (img) => {
        img.set({
          left: 50,
          top: 50,
          scaleX: 0.5,
          scaleY: 0.5
        });
        canvas.add(img);
      });
    };
    reader.readAsDataURL(file);
  }
});



// テキストを追加するボタンのイベントリスナー
document.getElementById('add-text-btn').addEventListener('click', () => {
  const textInput = document.getElementById('text-input').value; // ユーザー入力
  if (textInput.trim() === '') {
    alert('Please enter some text!');
    return;
  }

  // Fabric.jsのTextオブジェクトを作成
  const text = new fabric.Text(textInput, {
    left: 100, // 初期位置
    top: 100, // 初期位置
    fontSize: 24, // フォントサイズ
    fill: 'black', // テキストの色
    fontFamily: 'Arial', // フォント
    editable: true, // 編集可能
  });

  // キャンバスに追加
  canvas.add(text);

  // 入力フィールドをクリア
  document.getElementById('text-input').value = '';
});


// 背景色を変更するボタンのイベントリスナー
document.getElementById('change-bg-btn').addEventListener('click', () => {
  const bgColor = document.getElementById('background-color').value; // カラーピッカーの値を取得

  // 背景色を設定
  canvas.setBackgroundColor(bgColor, () => {
    canvas.renderAll(); // 再描画
  });
});


// 削除ボタンのイベントリスナー
document.getElementById('delete-btn').addEventListener('click', () => {
  const activeObject = canvas.getActiveObject(); // 選択されたオブジェクトを取得
  if (activeObject) {
    canvas.remove(activeObject); // オブジェクトを削除
    canvas.discardActiveObject(); // 選択状態を解除
    canvas.renderAll(); // 再描画
  } else {
    alert('削除するオブジェクトを選択してください');
  }
});



// ドラッグ中の画像URLを保存する変数
let draggedImageUrl = '';

// サイドバー画像のドラッグ開始イベント
document.querySelectorAll('#sidebar img').forEach(img => {
  img.addEventListener('dragstart', event => {
    draggedImageUrl = event.target.src; // ドラッグ中の画像URLを保存
    console.log(`Drag started, image URL: ${draggedImageUrl}`);
  });
});

// キャンバスにドラッグオーバー可能にする
const canvasWrapper = canvas.upperCanvasEl; // upperCanvasElを直接取得
canvasWrapper.addEventListener('dragover', event => {
  event.preventDefault(); // デフォルト動作を防ぐ
  console.log('Dragover event triggered on upperCanvas');
});

// キャンバスにドロップイベントを設定
canvasWrapper.addEventListener('drop', event => {
  event.preventDefault(); // デフォルト動作を防ぐ
  console.log('Drop event triggered on upperCanvas');

  // ドロップした位置を計算
  const rect = canvasWrapper.getBoundingClientRect();
  const left = event.clientX - rect.left;
  const top = event.clientY - rect.top;

  if (!draggedImageUrl) {
    console.error('No image URL found!');
    return;
  }

  // Fabric.jsで画像を読み込む
  fabric.Image.fromURL(draggedImageUrl, img => {
    img.set({
      left: left,
      top: top,
      originX: 'center',
      originY: 'center',
      scaleX: 0.3,
      scaleY: 0.3,
    });
    canvas.add(img); // キャンバスに追加
    canvas.renderAll(); // 再描画
    console.log(`Image added to canvas at (${left}, ${top})`);
  });
});

// ボディ全体にイベントリスナーを設定してテスト
document.body.addEventListener('drop', event => {
  console.log('Drop event triggered on body');
});



// // 保存ボタン: すべての画像を個別に保存
// const saveAllButton = document.getElementById('save-all');
// saveAllButton.addEventListener('click', () => {
//   const objects = canvas.getObjects(); // キャンバス上の全オブジェクトを取得

//   objects.forEach((obj, index) => {
//     if (obj.type === 'image') { // 画像オブジェクトの場合
//       const tempCanvas = new fabric.StaticCanvas(null, {
//         width: obj.width,
//         height: obj.height
//       });

//       tempCanvas.add(obj.clone());
//       const dataURL = tempCanvas.toDataURL({
//         format: 'png',
//         quality: 1
//       });

//       // ダウンロードリンクを作成してクリック
//       const link = document.createElement('a');
//       link.href = dataURL;
//       link.download = `image_${index + 1}.png`; // 保存されるファイル名
//       link.click();
//     }
//   });
// });