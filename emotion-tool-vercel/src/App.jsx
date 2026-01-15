import React, { useState, useEffect } from 'react';
import { Heart, Brain, Activity, TrendingUp, ChevronRight, ChevronLeft, Save, History, BarChart3 } from 'lucide-react';
import { ComposedChart, Line, Bar, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';

export default function EmotionAwarenessTool() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    timestamp: new Date().toISOString(),
    body: {},
    cognitive: [],
    emotions: [],
    initial: 0,
    final: 0,
    selectedStrategies: [],
    notes: ''
  });
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      // 使用 localStorage 替代 window.storage
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('session:')) {
          keys.push(key);
        }
      }
      
      const sessions = keys.map(key => {
        try {
          const data = localStorage.getItem(key);
          return data ? JSON.parse(data) : null;
        } catch {
          return null;
        }
      });
      
      setHistory(sessions.filter(s => s).sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      ));
    } catch (err) {
      console.log('載入失敗');
    }
  };

  const save = async () => {
    try {
      // 使用 localStorage 替代 window.storage
      localStorage.setItem(`session:${Date.now()}`, JSON.stringify(data));
      await loadHistory();
      alert('儲存成功！');
    } catch {
      alert('儲存失敗');
    }
  };

  const bodyParts = [
    { id: 'head', name: '頭部/頸部', desc: '常見:緊繃、沉重、頭痛、暈眩感、頸部僵硬、後腦勺緊繃感、耳鳴、咬緊牙根或磨牙' },
    { id: 'shoulders', name: '肩膀', desc: '常見:肩膀僵硬、聳肩、肌肉打結、酸痛感、沉重感' },
    { id: 'chest', name: '胸口', desc: '常見:胸悶、呼吸不順、心臟附近緊繃或壓迫感、喘不過氣' },
    { id: 'stomach', name: '腹部/胃部', desc: '常見:胃痛、胃部緊縮感、消化不良、腸胃不適、腹部緊繃' },
    { id: 'back', name: '背部', desc: '常見:上背部僵硬、下背痛、脊椎兩側緊繃、肌肉酸痛' },
    { id: 'arms', name: '手臂/手部', desc: '常見:手臂緊繃、手掌冒汗、手指僵硬、無力感、發麻' },
    { id: 'legs', name: '腿部/腳部', desc: '常見:腿部緊繃、膝蓋無力、雙腿發軟、腳底冰冷、坐立不安' }
  ];

  const cognitiveTypes = [
    { 
      id: 'polarized', 
      name: '兩極化思考(黑白思維)', 
      desc: '非黑即白,無中間地帶', 
      negativeExamples: ['考不好就覺得自己是失敗者', '不是完美就是徹底失敗', '他要不是朋友就是敵人'],
      positiveExamples: ['這次成功了,我就是天才', '他誇我一次,他一定很喜歡我']
    },
    { 
      id: 'overgeneralization', 
      name: '以偏概全', 
      desc: '根據單一事件推論普遍結論', 
      negativeExamples: ['一次失敗就認為永遠不會成功', '一個人對我不好,所有人都討厭我', '這次搞砸了,我什麼都做不好'],
      positiveExamples: ['一次成功就認為以後都會順利', '今天運氣好,每天都會這麼好']
    },
    { 
      id: 'emotional', 
      name: '情緒化推理', 
      desc: '感覺如何就認為是事實', 
      negativeExamples: ['我感到焦慮,一定有不好的事要發生', '我覺得很糟,所以我就是很糟的人', '我感到恐懼,所以這件事一定很危險'],
      positiveExamples: ['我感覺很好,所以一切都很完美', '我現在很開心,所以沒有任何問題']
    },
    { 
      id: 'catastrophizing', 
      name: '災難化思考', 
      desc: '總是想像最壞的結果', 
      negativeExamples: ['小感冒就認為是絕症', '遲到一次就會被開除', '說錯一句話關係就會破裂', '這次失誤會毀了我的人生'],
      positiveExamples: ['一個小成功就認為人生從此一帆風順']
    },
    { 
      id: 'should', 
      name: '過度要求(應有思維)', 
      desc: '對自己或他人有不切實際的必須或應該', 
      negativeExamples: ['我應該要完美', '我必須讓所有人滿意', '我不應該犯錯', '他應該要理解我', '事情必須按照我的計畫進行'],
      positiveExamples: ['我應該永遠保持快樂', '好事必須一直發生', '我不應該有負面情緒']
    },
    { 
      id: 'labeling', 
      name: '標籤化', 
      desc: '給自己或他人貼上負面標籤', 
      negativeExamples: ['我就是個笨蛋', '我是個失敗者', '他就是自私的人', '我注定孤獨一生'],
      positiveExamples: []
    },
    { 
      id: 'selective', 
      name: '選擇性注意', 
      desc: '只關注負面訊息,忽略正面訊息', 
      negativeExamples: ['收到10個讚美和1個批評,只記得批評', '工作做得很好但只想著那個小錯誤', '只看到自己的缺點'],
      positiveExamples: ['只看到好的一面,忽視潛在風險', '只記得成功,忘記需要改進的地方']
    },
    { 
      id: 'distortion', 
      name: '扭曲與淡化', 
      desc: '將好事合理化為偶然,將壞事視為重大', 
      negativeExamples: ['成功了是運氣好而已', '別人誇獎我只是客套', '這次做對了不代表什麼,但做錯就代表我很差'],
      positiveExamples: ['失敗了只是意外,不代表我有問題', '我犯錯不要緊,別人犯錯就是不專業']
    },
    { 
      id: 'blame', 
      name: '自責與責備', 
      desc: '將問題歸咎於自己或他人', 
      negativeExamples: ['都是我的錯', '如果不是他,事情就不會這樣', '我害了大家', '是他讓我這麼生氣的'],
      positiveExamples: []
    },
    { 
      id: 'worry', 
      name: '過度擔心', 
      desc: '沉浸於對未來的負面假設', 
      negativeExamples: ['如果我失敗了怎麼辦?', '要是他不喜歡我怎麼辦?', '萬一出事了怎麼辦?', '如果...那就完了'],
      positiveExamples: []
    },
    { 
      id: 'dependency', 
      name: '依賴', 
      desc: '認為自己需要依賴他人才能生活', 
      negativeExamples: ['沒有他我活不下去', '我需要別人來告訴我該怎麼做', '我無法獨自面對這件事'],
      positiveExamples: []
    },
    { 
      id: 'past', 
      name: '過去決定現在', 
      desc: '認為過去經驗決定現在,無法改變', 
      negativeExamples: ['我以前就是這樣,以後也不會變', '因為童年的經歷,我注定不幸福', '過去失敗過,現在也一定會失敗'],
      positiveExamples: []
    }
  ];

  const emotionQuadrants = {
    red: {
      name: '紅色區(高能量、低愉悅)',
      color: 'bg-red-100 border-red-300',
      rows: [
        ['憤怒', '驚慌失措', '壓力很大', '緊張不安', '震驚'],
        ['暴怒', '怒氣沖沖', '煩躁', '神經緊繃', '錯愕'],
        ['火冒三丈', '受到驚嚇', '生氣', '緊張', '坐立難安'],
        ['焦慮', '憂慮不安', '擔心', '被激怒', '被惹惱'],
        ['反感', '困擾', '在意', '忐忑不安', '不太高興']
      ]
    },
    yellow: {
      name: '黃色區(高能量、高愉悅)',
      color: 'bg-yellow-100 border-yellow-300',
      rows: [
        ['驚喜', '振奮', '歡慶', '心花怒放', '欣喜若狂'],
        ['充裕', '愉悅', '有動力', '受到啟發', '興高采烈'],
        ['精力充沛', '生氣勃勃', '興奮', '樂觀', '熱情洋溢'],
        ['開心', '集中', '快樂', '驕傲', '興奮激動'],
        ['令人愉快', '欣喜', '有希望', '好玩', '幸福']
      ]
    },
    blue: {
      name: '藍色區(低能量、低愉悅)',
      color: 'bg-blue-100 border-blue-300',
      rows: [
        ['厭惡', '死氣沉沉', '失望', '低落', '提不起勁'],
        ['悲觀', '鬱鬱寡歡', '洩氣', '難過', '無聊'],
        ['疏離', '悲慘', '孤單', '心灰意冷', '疲累'],
        ['消沉', '抑鬱', '悶悶不樂', '精疲力盡', '疲勞'],
        ['絕望', '無望', '孤寂', '疲憊不堪', '被榨乾']
      ]
    },
    green: {
      name: '綠色區(低能量、高愉悅)',
      color: 'bg-green-100 border-green-300',
      rows: [
        ['自在', '隨和', '知足', '充滿愛', '心滿意足'],
        ['平靜', '安全', '滿意', '滿懷感謝', '感動'],
        ['放鬆', '從容', '寧靜', '有福氣', '平衡'],
        ['柔和', '周到', '平和', '舒服', '無憂無慮'],
        ['想打瞌睡', '自鳴得意', '平穩', '舒適', '安詳']
      ]
    }
  };

  const getStrategies = () => {
    const strategies = [];
    const bodyVals = Object.values(data.body).filter(v => typeof v === 'number');
    const avgTension = bodyVals.length ? bodyVals.reduce((a, b) => a + b, 0) / bodyVals.length : 0;
    const highTension = bodyVals.filter(v => v >= 4).length;
    const redEmotions = data.emotions.filter(e => emotionQuadrants.red.rows.flat().includes(e)).length;
    const yellowEmotions = data.emotions.filter(e => emotionQuadrants.yellow.rows.flat().includes(e)).length;
    const blueEmotions = data.emotions.filter(e => emotionQuadrants.blue.rows.flat().includes(e)).length;
    const greenEmotions = data.emotions.filter(e => emotionQuadrants.green.rows.flat().includes(e)).length;

    if (avgTension >= 2 || highTension >= 2 || data.initial <= -2) {
      const physioStrategies = [];
      if (avgTension >= 3 || highTension >= 3) {
        physioStrategies.push({
          name: '方形呼吸法(Box Breathing)',
          category: '災前預防 & 災中應對',
          steps: ['找一個舒適的姿勢坐下', '吸氣-慢慢數到4(或3)', '屏息-數到4(或3)', '呼氣-數到4(或3)', '屏息-數到4(或3)', '重複循環5-10次,專注在呼吸的節奏上'],
          benefit: '降低交感神經系統過度激發,活化前額葉功能'
        });
        physioStrategies.push({
          name: '漸進式肌肉放鬆(PMR)',
          category: '災後復原',
          steps: ['從頭部開始,依序緊繃每個部位的肌肉', '每次緊繃維持5秒,用力程度約70%', '然後完全放鬆,感受緊繃與放鬆的差異', '依序:頭→肩→手臂→胸→腹→腿→腳', '整個過程約10-15分鐘'],
          benefit: '降低易激反應,釋放殘留的壓力能量,幫助副交感神經重新啟動'
        });
      }
      physioStrategies.push({
        name: '生理性嘆息(Physiological Sigh)',
        category: '災中應對 & 災後復原',
        steps: ['深深吸氣(吸到約80%肺活量)', '再快速吸一小口氣(補滿肺部)', '緩慢、完全地呼氣', '重複2-3次', '感受身體隨著呼氣而放鬆'],
        benefit: '快速降低壓力和焦慮,重新平衡自律神經系統'
      });
      if (physioStrategies.length > 0) strategies.push({ cat: '生理調節', icon: '🫁', items: physioStrategies });
    }

    if (data.cognitive.length > 0) {
      const cognitiveStrategies = [];
      cognitiveStrategies.push({
        name: 'ABC認知重建法',
        category: '災中應對 & 災後復原',
        steps: ['A (事件) - 寫下發生了什麼事', 'B (信念) - 你對這件事的想法是什麼?', 'C (結果) - 這個想法帶來什麼情緒和行為?', '挑戰B:有什麼證據支持?有什麼證據反對?', '建立新的B:更平衡、更實際的想法'],
        benefit: '降低災難化思考,重新啟動額葉理性功能'
      });
      if (data.cognitive.includes('catastrophizing') || data.cognitive.includes('worry')) {
        cognitiveStrategies.push({
          name: '時間框架轉換法',
          category: '災中應對',
          steps: ['問自己:現在這件事讓我有多困擾?(1-10分)', '8小時後:我還會這麼在意嗎?', '一個月後:這還重要嗎?', '一年後:我還會記得嗎?', '重新評估這件事在人生中的重要性'],
          benefit: '減少災難化思考的情緒強度,建立長遠觀點'
        });
      }
      if (data.cognitive.includes('polarized') || data.cognitive.includes('should') || data.cognitive.includes('labeling')) {
        cognitiveStrategies.push({
          name: '自我對話練習',
          category: '災中應對',
          steps: ['想像你最好的朋友遇到同樣的情況', '你會怎麼安慰他?你會對他說什麼?', '把這些溫暖、理解的話對自己說', '或想像:如果是你尊敬的人,他會如何應對?', '用同理心對待自己,就像對待好友一樣'],
          benefit: '跳脫自我批判,以更客觀溫和的角度看待自己'
        });
      }
      strategies.push({ cat: '認知調整', icon: '🧠', items: cognitiveStrategies });
    }

    if (data.initial <= -3 || data.cognitive.length >= 3) {
      strategies.push({
        cat: '感官調節', icon: '👁️', items: [
          { name: '五感回歸法(5-4-3-2-1技巧)', category: '災中應對', steps: ['5樣你看到的東西(注意顏色、形狀、細節)', '4樣你摸到的東西(質感、溫度、軟硬)', '3種你聽到的聲音(遠近、高低、節奏)', '2種你聞到的氣味', '1種你嚐到的味道'], benefit: '打斷災難化思考或過度活躍的交感神經,將注意力拉回當下,重新定位與扎根' },
          { name: '感官安撫技巧', category: '災中應對', steps: ['視覺:看喜歡的照片、影片,或欣賞美好事物', '聽覺:聽放鬆音樂、大自然聲音、或喜歡的歌', '嗅覺:使用精油、點香氛蠟燭、聞咖啡香', '味覺:品嚐喜歡的食物、喝溫熱飲品', '觸覺:抱抱枕、蓋舒服的毯子、摸寵物'], benefit: '透過感官刺激調節情緒,創造安全感和舒適感' }
        ]
      });
    }

    const actionStrategies = [];
    if (redEmotions >= 3 || data.initial <= -4) {
      actionStrategies.push(
        { name: '能量宣洩活動', category: '災中應對', steps: ['運動:快走、慢跑、游泳、騎腳踏車', '體力活動:打掃、整理環境、做家事', '創意表達:畫圖、寫字、唱歌、彈奏樂器', '找人訴苦:向信任的人傾訴感受', '持續10-20分鐘,讓身體釋放壓力能量'], benefit: '釋放高能量負面情緒,透過行動轉化情緒' },
        { name: '三秒法則-立即行動', category: '災中應對', steps: ['當感到僵住(freeze)或不知所措時', '問自己:現在最小的一步是什麼?', '數到3,立即去做', '不要給大腦思考藉口的時間', '完成後,再做下一個小步驟'], benefit: '打破僵住狀態,啟動問題解決導向思維' }
      );
    }
    if (blueEmotions >= 3) actionStrategies.push({ name: '溫和的自我照顧', category: '災後復原', steps: ['洗個熱水澡或泡澡', '午睡或早點休息', '吃些營養溫暖的食物', '做些簡單不費力的事(看書、看劇)', '允許自己放慢步調'], benefit: '恢復身心能量,給予自己溫柔的照顧' });
    if (yellowEmotions >= 3) actionStrategies.push({ name: '正向情緒分享', category: '維持與增強', steps: ['與他人分享你的喜悅和興奮', '寫下這個美好時刻的細節', '拍照記錄,未來可以回顧', '思考:是什麼帶來這份感受?', '計畫如何延續或重現這種感覺'], benefit: '延長正向情緒,增強記憶連結,提升整體幸福感' });
    if (greenEmotions >= 3) actionStrategies.push({ name: '正念品味練習', category: '維持與增強', steps: ['記錄下這個平靜美好的時刻', '注意身體的放鬆感受', '寫感恩日記:今天感謝的3件事', '慢慢品味這份寧靜,不急著做什麼', '允許自己充分享受當下'], benefit: '深化正向體驗,培養感恩心態,建立情緒緩衝' });
    actionStrategies.push({ name: '節奏性身體活動', category: '災後復原', steps: ['選擇有節奏的運動:快走、慢跑、游泳、跳舞', '或簡單的原地踏步、甩手、拍打身體', '持續10-20分鐘', '專注在身體的節奏和呼吸上', '模仿動物抖掉壓力的本能反應'], benefit: '釋放交感神經殘留能量,刺激前額葉恢復功能' });
    if (actionStrategies.length > 0) strategies.push({ cat: '行動策略', icon: '🏃', items: actionStrategies });

    const socialStrategies = [];
    if (blueEmotions >= 2 || redEmotions >= 2) {
      socialStrategies.push(
        { name: '尋求社會連結', category: '災前預防 & 災後復原', steps: ['找人吃飯、喝咖啡、一起散步', '和寵物互動:吸貓、遛狗、擁抱', '參與團體活動或課程', '到咖啡廳等有人的地方待著', '即使不說話,有人陪伴也有幫助'], benefit: '減少孤立感和無助感,提升安全感,活化腹側迷走神經系統' },
        { name: '到大自然走走', category: '災中應對 & 災後復原', steps: ['到公園、河邊、山上等自然環境', '慢慢走,觀察周圍的植物、天空、水流', '用五感體驗大自然', '至少停留20-30分鐘', '允許自己放空,不需要思考'], benefit: '接觸大自然可降低壓力荷爾蒙,恢復注意力,帶來平靜感' }
      );
    }
    socialStrategies.push(
      { name: '表達感受與尋求傾聽', category: '災中應對', steps: ['列出3-5個你信任的人', '選擇一個你現在感覺舒適聯絡的對象', '告訴他們:我現在需要有人聽我說', '說出你的感受,不需要尋求建議', '有時候,被理解和陪伴就是最好的支持'], benefit: '情緒表達有助於情緒調節,社會支持可降低壓力反應' },
      { name: '自我關懷練習', category: '災後復原', steps: ['把手放在心口,感受溫暖', '對自己說:這很困難,但我正在努力', '有這些感受是正常的,很多人也會這樣', '我值得被善待,包括被自己善待', '像對待好友一樣溫柔對待自己'], benefit: '建立心理安全感,促進正向適應與復原' },
      { name: '建立規律作息', category: '災後復原', steps: ['固定的睡眠時間(每晚7-9小時)', '規律的用餐時間,營養均衡', '每天至少20-30分鐘運動(有氧或HIIT)', '安排可預測的日常活動和休息時間', '建立收工儀式,標示工作與休息的界線'], benefit: '修復大腦結構,促進海馬迴神經新生,建立身心健康機制' }
    );
    strategies.push({ cat: '社交支持與生活調整', icon: '🤝', items: socialStrategies });

    return strategies;
  };

  // 歷史記錄頁面
  if (showHistory) {
    const totalSessions = history.length;
    const improvementScores = history.map(s => s.final - s.initial);
    const avgImprovement = totalSessions > 0 ? (improvementScores.reduce((a, b) => a + b, 0) / totalSessions).toFixed(1) : 0;
    const strategyCount = {};
    history.forEach(s => {
      if (s.selectedStrategies) {
        s.selectedStrategies.forEach(strategy => {
          strategyCount[strategy] = (strategyCount[strategy] || 0) + 1;
        });
      }
    });
    const mostUsedStrategy = Object.keys(strategyCount).length > 0 ? Object.entries(strategyCount).sort((a, b) => b[1] - a[1])[0][0] : '尚無記錄';
    const uniqueDays = new Set(history.map(s => new Date(s.timestamp).toLocaleDateString())).size;

    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-100 via-neutral-50 to-stone-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold flex items-center text-gray-800">
                  <History className="w-8 h-8 mr-3 text-stone-600" />歷史記錄總覽
                </h2>
                <p className="text-sm text-gray-500 mt-1">追蹤你的情緒調節歷程</p>
              </div>
              <button onClick={() => setShowHistory(false)} className="px-5 py-2.5 bg-stone-600 text-white rounded-lg hover:bg-stone-700 transition-all shadow-md font-medium">返回練習</button>
            </div>
            {history.length === 0 ? (
              <div className="text-center py-20">
                <BarChart3 className="w-20 h-20 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 text-lg">還沒有記錄</p>
                <p className="text-sm text-gray-400 mt-2">完成第一次練習後,數據就會顯示在這裡</p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-stone-400 to-stone-500 rounded-xl p-5 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-stone-50 text-sm font-medium">總使用次數</p>
                      <span className="text-2xl">📊</span>
                    </div>
                    <p className="text-4xl font-bold">{totalSessions}</p>
                    <p className="text-stone-100 text-xs mt-2">次練習記錄</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl p-5 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-emerald-50 text-sm font-medium">平均改善</p>
                      <span className="text-2xl">📈</span>
                    </div>
                    <p className="text-4xl font-bold">{parseFloat(avgImprovement) > 0 ? '+' : ''}{avgImprovement}</p>
                    <p className="text-emerald-100 text-xs mt-2">平均分數變化</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-400 to-slate-500 rounded-xl p-5 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-slate-50 text-sm font-medium">使用天數</p>
                      <span className="text-2xl">📅</span>
                    </div>
                    <p className="text-4xl font-bold">{uniqueDays}</p>
                    <p className="text-slate-100 text-xs mt-2">天持續練習</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl p-5 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-amber-50 text-sm font-medium">最常用策略</p>
                      <span className="text-2xl">⭐</span>
                    </div>
                    <p className="text-lg font-bold truncate">{mostUsedStrategy}</p>
                    <p className="text-amber-100 text-xs mt-2">你的首選方法</p>
                  </div>
                </div>

                {/* 情緒變化趨勢圖表 */}
                <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-stone-500 to-stone-600 p-4">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <TrendingUp className="w-6 h-6 mr-2" />
                      情緒變化趨勢
                    </h3>
                  </div>
                  <div className="p-6">
                    {history.length > 0 ? (
                      <div className="w-full h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart
                            data={history.slice().reverse().map((session, idx) => ({
                              index: idx + 1,
                              date: new Date(session.timestamp).toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' }),
                              initial: session.initial,
                              final: session.final,
                              improvement: session.final - session.initial
                            }))}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis 
                              dataKey="date" 
                              stroke="#6b7280"
                              style={{ fontSize: '12px' }}
                              label={{ value: '日期', position: 'insideBottom', offset: -10, style: { fill: '#6b7280' } }}
                            />
                            <YAxis 
                              domain={[-5, 5]}
                              stroke="#6b7280"
                              style={{ fontSize: '12px' }}
                              label={{ value: '分數', angle: -90, position: 'insideLeft', style: { fill: '#6b7280' } }}
                            />
                            <Tooltip
                              contentStyle={{ 
                                backgroundColor: 'white', 
                                border: '2px solid #e5e7eb', 
                                borderRadius: '8px',
                                padding: '12px'
                              }}
                              formatter={(value, name) => {
                                if (name === 'initial') return [value, '初始分數'];
                                if (name === 'final') return [value, '最終分數'];
                                if (name === 'improvement') return [value > 0 ? `+${value}` : value, '改善分數'];
                                return [value, name];
                              }}
                            />
                            <Legend 
                              wrapperStyle={{ paddingTop: '20px' }}
                              formatter={(value) => {
                                if (value === 'initial') return '初始分數';
                                if (value === 'final') return '最終分數';
                                if (value === 'improvement') return '改善分數';
                                return value;
                              }}
                            />
                            <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="3 3" />
                            
                            {/* 柱狀圖 - 改善分數 */}
                            <Bar 
                              dataKey="improvement" 
                              fill="#10b981"
                              opacity={0.3}
                              radius={[4, 4, 0, 0]}
                            >
                              {history.slice().reverse().map((session, index) => {
                                const improvement = session.final - session.initial;
                                return (
                                  <Cell 
                                    key={`cell-${index}`} 
                                    fill={improvement >= 0 ? '#10b981' : '#f97316'} 
                                  />
                                );
                              })}
                            </Bar>
                            
                            {/* 散點圖 - 初始分數 */}
                            <Scatter 
                              dataKey="initial" 
                              fill="#3b82f6"
                              shape="circle"
                            >
                              {history.map((entry, index) => (
                                <Cell key={`initial-${index}`} fill="#3b82f6" />
                              ))}
                            </Scatter>
                            
                            {/* 散點圖 - 最終分數 */}
                            <Scatter 
                              dataKey="final" 
                              fill="#10b981"
                              shape="circle"
                            >
                              {history.map((entry, index) => (
                                <Cell key={`final-${index}`} fill="#10b981" />
                              ))}
                            </Scatter>
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="text-center py-10 text-gray-500">
                        尚無足夠數據繪製圖表
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-stone-500 to-stone-600 p-4">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <TrendingUp className="w-6 h-6 mr-2" />
                      練習歷史記錄
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {history.map((session, idx) => {
                      const improvement = session.final - session.initial;
                      const date = new Date(session.timestamp);
                      return (
                        <div key={idx} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-semibold text-gray-800">
                                {date.toLocaleDateString('zh-TW', { month: 'long', day: 'numeric', year: 'numeric' })}
                              </p>
                              <p className="text-xs text-gray-500">
                                {date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className={`text-lg font-bold ${improvement > 0 ? 'text-green-600' : improvement < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                                {improvement > 0 ? '+' : ''}{improvement.toFixed(1)}
                              </p>
                              <p className="text-xs text-gray-500">
                                {session.initial.toFixed(1)} → {session.final.toFixed(1)}
                              </p>
                            </div>
                          </div>
                          {session.emotions && session.emotions.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {session.emotions.slice(0, 4).map((emotion, i) => (
                                <span key={i} className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
                                  {emotion}
                                </span>
                              ))}
                              {session.emotions.length > 4 && (
                                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                  +{session.emotions.length - 4}
                                </span>
                              )}
                            </div>
                          )}
                          {session.selectedStrategies && session.selectedStrategies.length > 0 && (
                            <p className="text-sm text-gray-600">
                              使用策略: {session.selectedStrategies.join(', ')}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* 頁腳 - 製作者資訊 */}
        <div className="mt-8 text-center">
          <div className="inline-block px-6 py-3 bg-white bg-opacity-60 rounded-lg border border-stone-200">
            <p className="text-sm text-stone-600">
              由 <span className="font-semibold text-stone-700">劉怡君臨床心理師</span> 設計開發
            </p>
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    {
      title: '初始評分',
      icon: <TrendingUp className="w-8 h-8" />,
      desc: '評估當前整體感受',
      content: (
        <div className="space-y-6">
          <p className="text-gray-600">請評估你現在的整體感受 (-5 到 +5)</p>
          <div className="bg-gradient-to-r from-red-50 via-gray-50 to-green-50 rounded-xl p-8">
            <div className="mb-6 text-center">
              <span className="text-6xl font-bold text-stone-700">{data.initial}</span>
              <p className="text-sm text-gray-600 mt-2">
                {data.initial <= -4 ? '非常糟糕' :
                 data.initial <= -2 ? '有點糟' :
                 data.initial <= 1 ? '還好' :
                 data.initial <= 3 ? '不錯' : '非常好'}
              </p>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              value={data.initial}
              onChange={e => setData({...data, initial: parseInt(e.target.value)})}
              className="w-full h-3 bg-gradient-to-r from-red-400 via-gray-300 to-green-400 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-3">
              <span>-5 (最糟)</span>
              <span>0 (中性)</span>
              <span>+5 (最好)</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: '身體掃描',
      icon: <Activity className="w-8 h-8" />,
      desc: '覺察身體各部位的緊繃程度',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 mb-4">請評估身體各部位的緊繃或不適程度 (0=完全放鬆, 5=非常緊繃)</p>
          {bodyParts.map(part => (
            <div key={part.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="font-semibold text-gray-800">{part.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{part.desc}</p>
                </div>
                <span className="text-2xl font-bold text-stone-700 min-w-12 text-center">
                  {data.body[part.id] ?? '-'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={data.body[part.id] ?? 0}
                onChange={e => setData({...data, body: {...data.body, [part.id]: parseInt(e.target.value)}})}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>完全放鬆</span>
                <span>非常緊繃</span>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      title: '認知模式識別',
      icon: <Brain className="w-8 h-8" />,
      desc: '辨識當前的思考模式',
      content: (
        <div className="space-y-3">
          <p className="text-gray-600 mb-4">選擇你現在或剛才出現的思考模式，請選擇2-3個較常出現的想法。</p>
          {cognitiveTypes.map(type => (
            <div
              key={type.id}
              onClick={() => {
                const updated = data.cognitive.includes(type.id)
                  ? data.cognitive.filter(t => t !== type.id)
                  : [...data.cognitive, type.id];
                setData({...data, cognitive: updated});
              }}
              className={`rounded-xl border-2 cursor-pointer transition-all overflow-hidden ${
                data.cognitive.includes(type.id)
                  ? 'bg-stone-50 border-stone-400 shadow-lg'
                  : 'bg-white border-gray-200 hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              {/* 標題區 */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">🧠</span>
                  <h3 className="font-bold text-lg text-gray-800">{type.name}</h3>
                  {data.cognitive.includes(type.id) && (
                    <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full font-semibold">✓ 已選</span>
                  )}
                </div>
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  data.cognitive.includes(type.id) ? 'bg-stone-500 border-stone-500' : 'border-gray-300'
                }`}>
                  {data.cognitive.includes(type.id) && <span className="text-white text-sm font-bold">✓</span>}
                </div>
              </div>

              {/* 定義區 */}
              <div className="px-4 pt-3 pb-2 bg-stone-50 bg-opacity-50">
                <div className="flex items-start gap-2">
                  <span className="text-sm">📖</span>
                  <p className="text-sm text-gray-700 font-medium">{type.desc}</p>
                </div>
              </div>

              {/* 例子區 */}
              <div className="p-4 space-y-3">
                {type.negativeExamples.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">💭</span>
                      <p className="text-xs font-semibold text-red-700">當我感到挫折/焦慮時:</p>
                    </div>
                    <div className="space-y-1 pl-6">
                      {type.negativeExamples.map((ex, i) => (
                        <p key={i} className="text-xs text-gray-600 italic border-l-2 border-red-300 pl-3 py-0.5">
                          「{ex}」
                        </p>
                      ))}
                    </div>
                  </div>
                )}
                
                {type.positiveExamples && type.positiveExamples.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">💭</span>
                      <p className="text-xs font-semibold text-yellow-700">當我感到興奮/開心時:</p>
                    </div>
                    <div className="space-y-1 pl-6">
                      {type.positiveExamples.map((ex, i) => (
                        <p key={i} className="text-xs text-gray-600 italic border-l-2 border-yellow-300 pl-3 py-0.5">
                          「{ex}」
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      title: '情緒命名',
      icon: <Heart className="w-8 h-8" />,
      desc: '精確指認當前的情緒感受',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 mb-4">選擇最貼近你當前感受的情緒詞彙 (可多選)</p>
          <div className="bg-white rounded-xl border-2 border-gray-300 p-6">
            {/* 標題說明 */}
            <div className="text-center mb-4">
              <p className="text-sm font-semibold text-gray-700">情緒座標圖</p>
            </div>
            
            {/* 2x2 網格佈局 with 縱軸 */}
            <div className="flex gap-3">
              {/* 左側縱軸標籤 */}
              <div className="flex flex-col justify-between items-center">
                <div className="text-xs text-gray-600 font-semibold mb-2">
                  高能量
                </div>
                <div className="flex-1 flex items-center">
                  <div className="text-xs text-gray-500 font-semibold" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                    能量軸
                  </div>
                </div>
                <div className="text-xs text-gray-600 font-semibold mt-2">
                  低能量
                </div>
              </div>
              
              {/* 主要網格區域 */}
              <div className="flex-1 grid grid-rows-2 gap-3">
              {/* 上排：高能量區 */}
              <div className="grid grid-cols-2 gap-3">
                {/* 左上：紅色區（高能量、低愉悅） */}
                <div className={`rounded-xl border-2 p-4 ${emotionQuadrants.red.color}`}>
                  <h3 className="font-bold text-sm mb-3 text-gray-800 text-center">紅色區<br/>(高能量、低愉悅)</h3>
                  <div className="grid grid-cols-5 gap-1.5">
                    {emotionQuadrants.red.rows.flat().map(emotion => (
                      <button
                        key={emotion}
                        onClick={() => {
                          const updated = data.emotions.includes(emotion)
                            ? data.emotions.filter(e => e !== emotion)
                            : [...data.emotions, emotion];
                          setData({...data, emotions: updated});
                        }}
                        className={`px-1 py-2 rounded text-xs font-medium transition-all whitespace-nowrap overflow-hidden text-ellipsis ${
                          data.emotions.includes(emotion)
                            ? 'bg-gray-800 text-white shadow-lg scale-105'
                            : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                        }`}
                        style={{ minWidth: 0 }}
                        title={emotion}
                      >
                        {emotion}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* 右上：黃色區（高能量、高愉悅） */}
                <div className={`rounded-xl border-2 p-4 ${emotionQuadrants.yellow.color}`}>
                  <h3 className="font-bold text-sm mb-3 text-gray-800 text-center">黃色區<br/>(高能量、高愉悅)</h3>
                  <div className="grid grid-cols-5 gap-1.5">
                    {emotionQuadrants.yellow.rows.flat().map(emotion => (
                      <button
                        key={emotion}
                        onClick={() => {
                          const updated = data.emotions.includes(emotion)
                            ? data.emotions.filter(e => e !== emotion)
                            : [...data.emotions, emotion];
                          setData({...data, emotions: updated});
                        }}
                        className={`px-1 py-2 rounded text-xs font-medium transition-all whitespace-nowrap overflow-hidden text-ellipsis ${
                          data.emotions.includes(emotion)
                            ? 'bg-gray-800 text-white shadow-lg scale-105'
                            : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                        }`}
                        style={{ minWidth: 0 }}
                        title={emotion}
                      >
                        {emotion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 下排：低能量區 */}
              <div className="grid grid-cols-2 gap-3">
                {/* 左下：藍色區（低能量、低愉悅） */}
                <div className={`rounded-xl border-2 p-4 ${emotionQuadrants.blue.color}`}>
                  <h3 className="font-bold text-sm mb-3 text-gray-800 text-center">藍色區<br/>(低能量、低愉悅)</h3>
                  <div className="grid grid-cols-5 gap-1.5">
                    {emotionQuadrants.blue.rows.flat().map(emotion => (
                      <button
                        key={emotion}
                        onClick={() => {
                          const updated = data.emotions.includes(emotion)
                            ? data.emotions.filter(e => e !== emotion)
                            : [...data.emotions, emotion];
                          setData({...data, emotions: updated});
                        }}
                        className={`px-1 py-2 rounded text-xs font-medium transition-all whitespace-nowrap overflow-hidden text-ellipsis ${
                          data.emotions.includes(emotion)
                            ? 'bg-gray-800 text-white shadow-lg scale-105'
                            : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                        }`}
                        style={{ minWidth: 0 }}
                        title={emotion}
                      >
                        {emotion}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* 右下：綠色區（低能量、高愉悅） */}
                <div className={`rounded-xl border-2 p-4 ${emotionQuadrants.green.color}`}>
                  <h3 className="font-bold text-sm mb-3 text-gray-800 text-center">綠色區<br/>(低能量、高愉悅)</h3>
                  <div className="grid grid-cols-5 gap-1.5">
                    {emotionQuadrants.green.rows.flat().map(emotion => (
                      <button
                        key={emotion}
                        onClick={() => {
                          const updated = data.emotions.includes(emotion)
                            ? data.emotions.filter(e => e !== emotion)
                            : [...data.emotions, emotion];
                          setData({...data, emotions: updated});
                        }}
                        className={`px-1 py-2 rounded text-xs font-medium transition-all whitespace-nowrap overflow-hidden text-ellipsis ${
                          data.emotions.includes(emotion)
                            ? 'bg-gray-800 text-white shadow-lg scale-105'
                            : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                        }`}
                        style={{ minWidth: 0 }}
                        title={emotion}
                      >
                        {emotion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              </div>
            </div>
            
            {/* 座標軸標示 */}
            <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
              <span>← 低愉悅</span>
              <span className="text-center">愉悅度</span>
              <span>高愉悅 →</span>
            </div>
          </div>
          
          {data.emotions.length > 0 && (
            <div className="mt-4 p-4 bg-stone-50 rounded-lg border border-stone-300">
              <p className="font-semibold text-stone-800 mb-2">已選擇的情緒:</p>
              <div className="flex flex-wrap gap-2">
                {data.emotions.map(e => (
                  <span key={e} className="px-3 py-1 bg-stone-600 text-white rounded-full text-sm font-medium">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <p className="text-sm text-emerald-900">
              <span className="font-semibold">💡 小提醒：</span>命名情緒的過程能提升前額葉活化，幫助我們有效調節情緒狀態。當我們精確地辨識並說出自己的感受時，大腦的情緒調節系統會更有效地運作。
            </p>
          </div>
          
          <div className="mt-3 p-3 bg-stone-50 rounded-lg border border-stone-200">
            <p className="text-xs text-stone-600">
              <span className="font-semibold">📚 資料來源：</span>此情緒座標圖改編自耶魯大學情緒智商中心 (Yale Center for Emotional Intelligence) 發展的 Mood Meter。
            </p>
          </div>
        </div>
      )
    },
    {
      title: '調節策略',
      icon: <Activity className="w-8 h-8" />,
      desc: '選擇適合的調節方法',
      content: (
        <div className="space-y-6">
          <p className="text-gray-600 mb-4">依據您剛才提供的訊息，我推薦您使用以下調節策略，您可以勾選幾項並練習</p>
          {getStrategies().map((stratGroup, idx) => (
            <div key={idx} className="bg-gradient-to-br from-stone-50 to-neutral-50 rounded-xl p-5 border-2 border-stone-200">
              <h3 className="text-xl font-bold mb-4 flex items-center text-stone-800">
                <span className="text-3xl mr-3">{stratGroup.icon}</span>
                {stratGroup.cat}
              </h3>
              <div className="space-y-4">
                {stratGroup.items.map((strat, sidx) => (
                  <div
                    key={sidx}
                    onClick={() => {
                      const updated = data.selectedStrategies.includes(strat.name)
                        ? data.selectedStrategies.filter(s => s !== strat.name)
                        : [...data.selectedStrategies, strat.name];
                      setData({...data, selectedStrategies: updated});
                    }}
                    className={`bg-white rounded-lg p-4 cursor-pointer border-2 transition-all ${
                      data.selectedStrategies.includes(strat.name)
                        ? 'border-emerald-400 shadow-lg'
                        : 'border-gray-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 text-lg">{strat.name}</p>
                        <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full mt-1">
                          {strat.category}
                        </span>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-2 ${
                        data.selectedStrategies.includes(strat.name) ? 'bg-emerald-400 border-emerald-400' : 'border-gray-300'
                      }`}>
                        {data.selectedStrategies.includes(strat.name) && <span className="text-white text-sm">✓</span>}
                      </div>
                    </div>
                    <div className="bg-stone-50 rounded-lg p-3 mb-2">
                      <p className="text-sm font-semibold text-stone-800 mb-2">步驟:</p>
                      <ol className="text-sm text-gray-700 space-y-1 pl-4">
                        {strat.steps.map((step, i) => (
                          <li key={i} className="list-decimal">{step}</li>
                        ))}
                      </ol>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-green-900 mb-1">效益:</p>
                      <p className="text-sm text-gray-700">{strat.benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      title: '最終評分',
      icon: <TrendingUp className="w-8 h-8" />,
      desc: '評估調節後的感受',
      content: (
        <div className="space-y-6">
          <p className="text-gray-600">謝謝您一同經歷了這段調節旅程，現在，請您再稍微感覺一下整體的狀態，重新評估你的整體感受 (-5 到 +5)</p>
          <div className="bg-gradient-to-r from-red-50 via-gray-50 to-green-50 rounded-xl p-8">
            <div className="mb-6 text-center">
              <span className="text-6xl font-bold text-stone-700">{data.final}</span>
              <p className="text-sm text-gray-600 mt-2">
                {data.final <= -4 ? '非常糟糕' :
                 data.final <= -2 ? '有點糟' :
                 data.final <= 1 ? '還好' :
                 data.final <= 3 ? '不錯' : '非常好'}
              </p>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              value={data.final}
              onChange={e => setData({...data, final: parseInt(e.target.value)})}
              className="w-full h-3 bg-gradient-to-r from-red-400 via-gray-300 to-green-400 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-3">
              <span>-5 (最糟)</span>
              <span>0 (中性)</span>
              <span>+5 (最好)</span>
            </div>
          </div>
          {data.final !== data.initial && (
            <div className={`p-4 rounded-lg ${data.final > data.initial ? 'bg-green-50 border-green-300' : 'bg-orange-50 border-orange-300'} border-2`}>
              <p className="font-semibold text-lg">
                變化: {data.final > data.initial ? '↑' : '↓'} {Math.abs(data.final - data.initial).toFixed(1)} 分
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {data.final > data.initial 
                  ? '做得很好!策略有幫助!' 
                  : '沒關係,情緒調節需要時間和練習'}
              </p>
            </div>
          )}
        </div>
      )
    },
    {
      title: '反思筆記',
      icon: <Save className="w-8 h-8" />,
      desc: '記錄心得與發現',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">記錄這次練習的發現、心得或任何想法</p>
          <textarea
            value={data.notes}
            onChange={e => setData({...data, notes: e.target.value})}
            placeholder="例如:今天發現身體掃描特別有效,肩膀放鬆後心情也變好了..."
            className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none text-gray-700"
          />
          <div className="bg-stone-50 rounded-lg p-4 border border-stone-200">
            <p className="font-semibold text-stone-800 mb-2">本次練習摘要:</p>
            <div className="space-y-1 text-sm text-gray-700">
              <p>• 身體緊繃部位: {Object.entries(data.body).filter(([k,v]) => v >= 3).length} 處</p>
              <p>• 認知模式: {data.cognitive.length} 種</p>
              <p>• 情緒詞彙: {data.emotions.length} 個</p>
              <p>• 使用策略: {data.selectedStrategies.length} 項</p>
              <p>• 感受變化: {data.initial} → {data.final} ({data.final > data.initial ? '+' : ''}{(data.final - data.initial).toFixed(1)})</p>
            </div>
          </div>
          <button
            onClick={save}
            className="w-full py-4 bg-gradient-to-r from-stone-600 to-stone-500 text-white rounded-xl font-bold text-lg hover:from-stone-700 hover:to-stone-600 transition-all shadow-lg flex items-center justify-center"
          >
            <Save className="w-6 h-6 mr-2" />
            儲存此次練習記錄
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-neutral-50 to-stone-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-stone-600 to-stone-500 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">情緒覺察與調節工具</h1>
            <p className="text-stone-100">7步驟系統化情緒管理練習</p>
            <button
              onClick={() => setShowHistory(true)}
              className="mt-4 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all flex items-center text-sm font-medium"
            >
              <History className="w-4 h-4 mr-2" />
              查看歷史記錄
            </button>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              {steps.map((s, idx) => (
                <div key={idx} className="flex items-center">
                  <div
                    onClick={() => setStep(idx)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold cursor-pointer transition-all ${
                      idx === step
                        ? 'bg-stone-500 text-white scale-110 shadow-lg'
                        : idx < step
                        ? 'bg-stone-400 text-white'
                        : 'bg-stone-200 text-stone-500'
                    }`}
                  >
                    {idx < step ? '✓' : idx + 1}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`w-8 h-1 ${idx < step ? 'bg-stone-400' : 'bg-stone-200'}`} />
                  )}
                </div>
              ))}
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-3 text-stone-700">
                {steps[step].icon}
                <h2 className="text-2xl font-bold ml-3">{steps[step].title}</h2>
              </div>
              <p className="text-gray-600">{steps[step].desc}</p>
            </div>

            <div className="max-h-96 overflow-y-auto mb-6 pr-2">
              {steps[step].content}
            </div>

            <div className="flex justify-between gap-3">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
                  step === 0
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    : 'bg-stone-500 text-white hover:bg-stone-600 shadow-md'
                }`}
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                上一步
              </button>
              <button
                onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                disabled={step === steps.length - 1}
                className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
                  step === steps.length - 1
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    : 'bg-stone-600 text-white hover:bg-stone-700 shadow-md'
                }`}
              >
                下一步
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            </div>
          </div>
        </div>
        
        {/* 頁腳 - 製作者資訊 */}
        <div className="mt-8 text-center">
          <div className="inline-block px-6 py-3 bg-white bg-opacity-60 rounded-lg border border-stone-200">
            <p className="text-sm text-stone-600">
              由 <span className="font-semibold text-stone-700">劉怡君臨床心理師</span> 設計開發
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
