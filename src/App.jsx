import { useState, useEffect, useRef } from 'react'

const activities = [
  {
    id: 1,
    title: '손 씻기 & 세수하기',
    category: 'short',
    duration: '5분',
    difficulty: '매우 쉬움',
    effect: '기분 전환, 청결감 향상',
    preparation: '비누, 수건',
    method: '따뜻한 물로 손을 씻고 얼굴도 가볍게 닦아내세요.'
  },
  {
    id: 2,
    title: '스트레칭 10선',
    category: 'short',
    duration: '10분',
    difficulty: '쉬움',
    effect: '근육 이완, 혈액 순환 개선',
    preparation: '편한 옷',
    method: '목, 어깨, 팔, 허리, 다리 순서로 가볍게 늘여주세요.'
  },
  {
    id: 3,
    title: '차 한 잔 마시기',
    category: 'short',
    duration: '8분',
    difficulty: '매우 쉬움',
    effect: '심신 안정, 수분 보충',
    preparation: '차, 머그컵',
    method: '좋아하는 차를 우려내고 천천히 음미하며 마시세요.'
  },
  {
    id: 4,
    title: '5분 명상',
    category: 'short',
    duration: '5분',
    difficulty: '보통',
    effect: '스트레스 감소, 집중력 향상',
    preparation: '편안한 자세',
    method: '눈을 감고 숨에 집중하며 잡생각을 내려놓으세요.'
  },
  {
    id: 5,
    title: '주변 정리하기',
    category: 'short',
    duration: '15분',
    difficulty: '쉬움',
    effect: '성취감, 환경 개선',
    preparation: '필요 없음',
    method: '책상이나 주변 공간을 간단히 정리해보세요.'
  },
  {
    id: 6,
    title: '산책하기',
    category: 'medium',
    duration: '30분',
    difficulty: '쉬움',
    effect: '기분 전환, 신선한 공기',
    preparation: '편한 신발',
    method: '가까운 공원이나 동네를 걸어보세요.'
  },
  {
    id: 7,
    title: '간단한 요리하기',
    category: 'medium',
    duration: '45분',
    difficulty: '보통',
    effect: '성취감, 영양 보충',
    preparation: '간단한 재료',
    method: '샌드위치나 샐러드처럼 쉬운 요리를 해보세요.'
  },
  {
    id: 8,
    title: '음악 감상',
    category: 'medium',
    duration: '40분',
    difficulty: '매우 쉬움',
    effect: '심신 안정, 감성 충전',
    preparation: '스피커 or 이어폰',
    method: '좋아하는 플레이리스트를 마음껏 들어보세요.'
  },
  {
    id: 9,
    title: '독서',
    category: 'medium',
    duration: '1시간',
    difficulty: '보통',
    effect: '지식 습득, 집중력 향상',
    preparation: '책 or 전자책',
    method: '관심 있는 주제의 책을 읽어보세요.'
  },
  {
    id: 10,
    title: '그림 그리기',
    category: 'medium',
    duration: '50분',
    difficulty: '보통',
    effect: '창의성 향상, 스트레스 해소',
    preparation: '종이, 펜',
    method: '잘 그리지 못해도 좋아요, 마음껏 그려보세요.'
  },
  {
    id: 11,
    title: '운동하기',
    category: 'medium',
    duration: '45분',
    difficulty: '보통',
    effect: '체력 향상, 엔도르핀 분비',
    preparation: '운동복',
    method: '홈 트레이닝이나 간단한 근력 운동을 해보세요.'
  },
  {
    id: 12,
    title: '블로그 글 쓰기',
    category: 'medium',
    duration: '1시간',
    difficulty: '보통',
    effect: '생각 정리, 표현력 향상',
    preparation: '노트 or 컴퓨터',
    method: '오늘 느낀 점이나 생각을 자유롭게 적어보세요.'
  },
  {
    id: 13,
    title: '새로운 언어 기초 배우기',
    category: 'long',
    duration: '1시간 30분',
    difficulty: '어려움',
    effect: '뇌 활성화, 새로운 지식',
    preparation: '언어 앱 or 책',
    method: '기본 인사나 단어를 배워보세요.'
  },
  {
    id: 14,
    title: '프로젝트 기획하기',
    category: 'long',
    duration: '2시간',
    difficulty: '어려움',
    effect: '생산성 향상, 목표 설정',
    preparation: '노트, 컴퓨터',
    method: '하고 싶은 프로젝트를 구체적으로 계획해보세요.'
  },
  {
    id: 15,
    title: '온라인 강의 듣기',
    category: 'long',
    duration: '1시간 30분',
    difficulty: '보통',
    effect: '자기 계발, 지식 습득',
    preparation: '컴퓨터, 인터넷',
    method: '관심 있는 분야의 강의를 들어보세요.'
  },
  {
    id: 16,
    title: 'DIY 만들기',
    category: 'long',
    duration: '2시간',
    difficulty: '어려움',
    effect: '성취감, 창의성 향상',
    preparation: '재료, 도구',
    method: '간단한 공예품이나 리폼을 해보세요.'
  },
  {
    id: 17,
    title: '사진 촬영 산책',
    category: 'long',
    duration: '1시간 30분',
    difficulty: '보통',
    effect: '감각 향상, 추억 만들기',
    preparation: '카메라 or 스마트폰',
    method: '동네를 돌아다니며 예쁜 풍경을 담아보세요.'
  },
  {
    id: 18,
    title: '보고서 작성',
    category: 'long',
    duration: '2시간',
    difficulty: '어려움',
    effect: '생산성 향상, 업무 완료',
    preparation: '자료, 컴퓨터',
    method: '필요한 보고서나 문서를 작성해보세요.'
  },
  {
    id: 19,
    title: '레시피 연구 & 요리',
    category: 'long',
    duration: '2시간',
    difficulty: '어려움',
    effect: '새로운 기술, 맛있는 식사',
    preparation: '재료, 요리 도구',
    method: '새로운 레시피를 찾아 도전해보세요.'
  },
  {
    id: 20,
    title: '회고 & 계획',
    category: 'long',
    duration: '1시간 30분',
    difficulty: '보통',
    effect: '자기 성찰, 미래 계획',
    preparation: '노트',
    method: '지난 시간을 돌아보고 앞으로의 계획을 세워보세요.'
  }
]

function App() {
  const [screen, setScreen] = useState('onboarding')
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [tasks, setTasks] = useState([''])
  const [mood, setMood] = useState('')
  const [recommendedTask, setRecommendedTask] = useState('')
  const [timer, setTimer] = useState(25 * 60)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [noisePlaying, setNoisePlaying] = useState(false)
  const [gameScore, setGameScore] = useState(0)
  
  const [stressTimer, setStressTimer] = useState(60)
  const [isStressTimerRunning, setIsStressTimerRunning] = useState(false)
  const [stressNotification, setStressNotification] = useState('')
  
  const [randomActivity, setRandomActivity] = useState(null)
  const [activityCategory, setActivityCategory] = useState('all')
  
  const timerRef = useRef(null)
  const stressTimerRef = useRef(null)

  const onboardingTexts = [
    { text: '주의 전환이 잦으면 작업 착수가 지연될 수 있습니다.', icon: '🧠' },
    { text: '이 앱은 현재 상황에서 가장 적합한 한 가지 작업을 제안합니다.', icon: '✨' },
    { text: '추가 판단 단계를 줄여 바로 실행할 수 있도록 설계했습니다.', icon: '🚀' }
  ]

  const moods = [
    { label: '집중 가능', value: 'focus', emoji: '🎯' },
    { label: '피곤함', value: 'tired', emoji: '😴' },
    { label: '머리가 복잡함', value: 'busy', emoji: '🤯' },
    { label: '시간이 부족함', value: 'rush', emoji: '⏰' }
  ]

  const recommendTask = () => {
    if (tasks[0].trim() === '') {
      setRecommendedTask('잠시 산책하기')
    } else {
      setRecommendedTask(tasks[0])
    }
    setScreen('recommend')
  }

  const startTimer = () => {
    setIsTimerRunning(true)
    setNoisePlaying(true)
    setScreen('timer')
  }

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer(t => t - 1)
      }, 1000)
    } else if (timer === 0) {
      setIsTimerRunning(false)
      setScreen('complete')
    }
    return () => clearInterval(timerRef.current)
  }, [isTimerRunning, timer])

  useEffect(() => {
      if (isStressTimerRunning && stressTimer > 0) {
        stressTimerRef.current = setInterval(() => {
          setStressTimer(t => {
            const newTime = t - 1
            if (newTime === 45) setStressNotification('15초 지났어요!')
            if (newTime === 30) setStressNotification('30초 지났어요!')
            if (newTime === 15) setStressNotification('45초 지났어요!')
            if (newTime === 0) {
              setIsStressTimerRunning(false)
              setStressNotification('시간 완료! 스트레스가 풀렸나요?')
              getRandomActivity()
            }
            return newTime
          })
        }, 1000)
      }
      return () => clearInterval(stressTimerRef.current)
    }, [isStressTimerRunning])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const togglePause = () => {
    setIsTimerRunning(!isTimerRunning)
  }

  const resetAndGoHome = () => {
    setTimer(25 * 60)
    setIsTimerRunning(false)
    setNoisePlaying(false)
    setTasks([''])
    setMood('')
    setScreen('input')
  }

  const startStressTimer = () => {
    setStressTimer(60)
    setIsStressTimerRunning(true)
    setStressNotification('')
    setRandomActivity(null)
  }

  const toggleStressPause = () => {
    setIsStressTimerRunning(!isStressTimerRunning)
  }

  const resetStressTimer = () => {
    setIsStressTimerRunning(false)
    setStressTimer(60)
    setStressNotification('')
    setRandomActivity(null)
  }

  const getRandomActivity = (category = 'all') => {
    let filtered = activities
    if (category !== 'all') {
      filtered = activities.filter(a => a.category === category)
    }
    const random = filtered[Math.floor(Math.random() * filtered.length)]
    setRandomActivity(random)
  }

  const GameCanvas = () => {
    const canvasRef = useRef(null)
    const animationRef = useRef(null)
    
    const [gameState, setGameState] = useState('idle')
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(() => {
      const saved = localStorage.getItem('breakoutHighScore')
      return saved ? parseInt(saved) : 0
    })
    const [lives, setLives] = useState(3)
    const [level, setLevel] = useState(1)
    
    const paddleRef = useRef({ x: 150, width: 80, height: 15 })
    const ballRef = useRef({ x: 190, y: 400, dx: 3, dy: -3, radius: 8 })
    const bricksRef = useRef([])
    const scoreRef = useRef(0)
    const livesRef = useRef(3)
    const levelRef = useRef(1)

    const brickColors = ['#F5C6D0', '#A8D5E8', '#B8E6C8', '#FFD9A8', '#D4B8E8']
    const brickPoints = [50, 40, 30, 20, 10]

    const initBricks = () => {
      const rows = Math.min(3 + levelRef.current, 5)
      const cols = 5
      const brickWidth = 60
      const brickHeight = 20
      const padding = 10
      const offsetTop = 50
      const offsetLeft = 20
      const bricks = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          bricks.push({
            x: c * (brickWidth + padding) + offsetLeft,
            y: r * (brickHeight + padding) + offsetTop,
            width: brickWidth,
            height: brickHeight,
            visible: true,
            color: brickColors[r % brickColors.length],
            points: brickPoints[r % brickPoints.length]
          })
        }
      }
      bricksRef.current = bricks
    }

    const startGame = () => {
      setGameState('playing')
      setScore(0)
      setLives(3)
      setLevel(1)
      scoreRef.current = 0
      livesRef.current = 3
      levelRef.current = 1
      paddleRef.current = { x: 150, width: 80, height: 15 }
      ballRef.current = { x: 190, y: 400, dx: 3 + levelRef.current * 0.5, dy: -3 - levelRef.current * 0.5, radius: 8 }
      initBricks()
    }

    const nextLevel = () => {
      setLevel(l => l + 1)
      levelRef.current += 1
      paddleRef.current = { x: 150, width: 80, height: 15 }
      ballRef.current = { x: 190, y: 400, dx: 3 + levelRef.current * 0.5, dy: -3 - levelRef.current * 0.5, radius: 8 }
      initBricks()
      setGameState('playing')
    }

    const resetBall = () => {
      ballRef.current = { x: 190, y: 400, dx: 3 + levelRef.current * 0.5, dy: -3 - levelRef.current * 0.5, radius: 8 }
    }

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        ctx.fillStyle = '#F5F0E8'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        bricksRef.current.forEach(brick => {
          if (brick.visible) {
            ctx.fillStyle = brick.color
            ctx.beginPath()
            ctx.roundRect(brick.x, brick.y, brick.width, brick.height, 8)
            ctx.fill()
          }
        })

        ctx.fillStyle = '#B8E6C8'
        ctx.beginPath()
        ctx.roundRect(paddleRef.current.x, canvas.height - 40, paddleRef.current.width, paddleRef.current.height, 8)
        ctx.fill()

        ctx.fillStyle = '#F5C6D0'
        ctx.beginPath()
        ctx.arc(ballRef.current.x, ballRef.current.y, ballRef.current.radius, 0, Math.PI * 2)
        ctx.fill()

        if (gameState === 'playing') {
          ballRef.current.x += ballRef.current.dx
          ballRef.current.y += ballRef.current.dy

          if (ballRef.current.x + ballRef.current.radius > canvas.width || ballRef.current.x - ballRef.current.radius < 0) {
            ballRef.current.dx *= -1
          }
          if (ballRef.current.y - ballRef.current.radius < 0) {
            ballRef.current.dy *= -1
          }

          if (
            ballRef.current.y + ballRef.current.radius > canvas.height - 40 &&
            ballRef.current.y - ballRef.current.radius < canvas.height - 25 &&
            ballRef.current.x > paddleRef.current.x - ballRef.current.radius &&
            ballRef.current.x < paddleRef.current.x + paddleRef.current.width + ballRef.current.radius
          ) {
            ballRef.current.dy = -Math.abs(ballRef.current.dy)
            const hitPos = (ballRef.current.x - paddleRef.current.x) / paddleRef.current.width
            ballRef.current.dx = (hitPos - 0.5) * 8
          }

          let allBroken = true
          bricksRef.current.forEach(brick => {
            if (brick.visible) {
              allBroken = false
              const closestX = Math.max(brick.x, Math.min(ballRef.current.x, brick.x + brick.width))
              const closestY = Math.max(brick.y, Math.min(ballRef.current.y, brick.y + brick.height))
              const distanceX = ballRef.current.x - closestX
              const distanceY = ballRef.current.y - closestY
              const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

              if (distance < ballRef.current.radius) {
                const overlapLeft = (ballRef.current.x + ballRef.current.radius) - brick.x
                const overlapRight = (brick.x + brick.width) - (ballRef.current.x - ballRef.current.radius)
                const overlapTop = (ballRef.current.y + ballRef.current.radius) - brick.y
                const overlapBottom = (brick.y + brick.height) - (ballRef.current.y - ballRef.current.radius)

                const minOverlapX = Math.min(overlapLeft, overlapRight)
                const minOverlapY = Math.min(overlapTop, overlapBottom)

                if (minOverlapX < minOverlapY) {
                  ballRef.current.dx *= -1
                } else {
                  ballRef.current.dy *= -1
                }

                brick.visible = false
                scoreRef.current += brick.points
                setScore(scoreRef.current)
              }
            }
          })

          if (allBroken) {
            setGameState('cleared')
            if (scoreRef.current > highScore) {
              setHighScore(scoreRef.current)
              localStorage.setItem('breakoutHighScore', scoreRef.current.toString())
            }
          }

          if (ballRef.current.y > canvas.height + 50) {
            livesRef.current -= 1
            setLives(livesRef.current)
            if (livesRef.current <= 0) {
              setGameState('gameover')
              if (scoreRef.current > highScore) {
                setHighScore(scoreRef.current)
                localStorage.setItem('breakoutHighScore', scoreRef.current.toString())
              }
            } else {
              resetBall()
            }
          }
        }

        animationRef.current = requestAnimationFrame(draw)
      }

      draw()
      return () => cancelAnimationFrame(animationRef.current)
    }, [gameState, highScore])

    const handleMove = (e) => {
      if (gameState !== 'playing') return
      const rect = canvasRef.current.getBoundingClientRect()
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left
      paddleRef.current.x = x - paddleRef.current.width / 2
      if (paddleRef.current.x < 0) paddleRef.current.x = 0
      if (paddleRef.current.x + paddleRef.current.width > canvasRef.current.width) {
        paddleRef.current.x = canvasRef.current.width - paddleRef.current.width
      }
    }

    return (
      <div className="flex flex-col items-center">
        {gameState === 'idle' && (
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">🎮 벽돌깨기</h2>
            <p className="text-gray-500 mb-2">최고 점수: {highScore}</p>
            <p className="text-gray-500 mb-6">공을 튕겨 벽돌을 깨보세요!</p>
            <button
              onClick={startGame}
              className="w-full bg-blue-pastel text-gray-700 px-8 py-3 rounded-full text-xl font-bold mb-4"
            >
              게임 시작
            </button>
          </div>
        )}
        
        {gameState === 'playing' && (
          <div className="flex justify-between w-full mb-3 px-2">
            <div className="text-lg font-bold text-gray-600">❤️ {lives}</div>
            <div className="text-lg font-bold text-gray-600">💎 {score}</div>
            <div className="text-lg font-bold text-gray-600">Lv.{level}</div>
          </div>
        )}
        
        {gameState === 'cleared' && (
          <div className="text-center mb-4 bg-green-pastel/30 rounded-2xl p-6 w-full">
            <div className="text-4xl mb-2">🎉</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">클리어!</h2>
            <p className="text-lg text-gray-600 mb-2">점수: {score}</p>
            <p className="text-gray-500 mb-4">레벨 {level} 완료!</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={nextLevel}
                className="bg-green-pastel text-gray-700 px-6 py-2 rounded-full font-bold"
              >
                다음 레벨
              </button>
              <button
                onClick={() => setScreen('input')}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-bold"
              >
                메인으로
              </button>
            </div>
          </div>
        )}
        
        {gameState === 'gameover' && (
          <div className="text-center mb-4 bg-pink-pastel/30 rounded-2xl p-6 w-full">
            <div className="text-4xl mb-2">😢</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">게임 오버</h2>
            <p className="text-lg text-gray-600 mb-2">최종 점수: {score}</p>
            {score >= highScore && score > 0 && (
              <p className="text-green-600 font-bold mb-2">🏆 새로운 최고 기록!</p>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={startGame}
                className="bg-blue-pastel text-gray-700 px-6 py-2 rounded-full font-bold"
              >
                다시 하기
              </button>
              <button
                onClick={() => { setGameState('idle'); setScreen('input'); }}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-bold"
              >
                메인으로
              </button>
            </div>
          </div>
        )}
        
        <canvas
          ref={canvasRef}
          width={380}
          height={500}
          className="rounded-2xl shadow-lg"
          onMouseMove={handleMove}
          onTouchMove={handleMove}
        />
        
        <button
          onClick={() => setScreen('input')}
          className="w-full mt-4 text-gray-500"
        >
          ← 메인으로 돌아가기
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-beige-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {screen === 'onboarding' && (
          <div className="bg-white rounded-3xl p-8 shadow-lg min-h-[500px] flex flex-col items-center justify-center">
            <div className="text-6xl mb-6">{onboardingTexts[onboardingStep].icon}</div>
            <p className="text-xl text-gray-700 text-center mb-8">{onboardingTexts[onboardingStep].text}</p>
            {onboardingStep < 2 ? (
              <button
                onClick={() => setOnboardingStep(s => s + 1)}
                className="bg-blue-pastel text-gray-700 px-8 py-3 rounded-full text-lg font-bold"
              >
                다음
              </button>
            ) : (
              <button
                onClick={() => setScreen('input')}
                className="bg-green-pastel text-gray-700 px-8 py-3 rounded-full text-lg font-bold"
              >
                시작하기
              </button>
            )}
            <div className="flex gap-2 mt-6">
              {[0, 1, 2].map(i => (
                <div key={i} className={`w-3 h-3 rounded-full ${i === onboardingStep ? 'bg-blue-pastel' : 'bg-gray-200'}`} />
              ))}
            </div>
          </div>
        )}

        {screen === 'input' && (
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">오늘 해야 할 일 1가지</h1>
            <div className="mb-6">
              <input
                type="text"
                value={tasks[0]}
                onChange={(e) => setTasks([e.target.value])}
                placeholder="지금 집중할 일"
                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-lg focus:border-blue-pastel focus:outline-none"
              />
            </div>
            <h2 className="text-lg font-bold text-gray-700 mb-3">지금 상태는?</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {moods.map(m => (
                <button
                  key={m.value}
                  onClick={() => setMood(m.value)}
                  className={`p-4 rounded-xl border-2 ${mood === m.value ? 'border-blue-pastel bg-blue-pastel/20' : 'border-gray-100'}`}
                >
                  <div className="text-2xl mb-1">{m.emoji}</div>
                  <div className="text-sm text-gray-600">{m.label}</div>
                </button>
              ))}
            </div>
            <button
              onClick={recommendTask}
              className="w-full bg-blue-pastel text-gray-700 py-4 rounded-xl text-xl font-bold mb-3"
            >
              시작
            </button>
            <button
              onClick={() => setScreen('stress')}
              className="w-full bg-pink-pastel text-gray-700 py-3 rounded-xl text-lg font-bold mb-3"
            >
              😌 스트레스 해소
            </button>
            <button
              onClick={() => setScreen('activity')}
              className="w-full bg-green-pastel text-gray-700 py-3 rounded-xl text-lg font-bold mb-3"
            >
              🎲 랜덤 활동 추천
            </button>
            <button
              onClick={() => setScreen('game')}
              className="w-full bg-blue-pastel/50 text-gray-700 py-3 rounded-xl text-lg font-bold"
            >
              🎮 미니게임
            </button>
          </div>
        )}

        {screen === 'recommend' && (
          <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
            <h2 className="text-lg text-gray-500 mb-4">지금 시작할 한 가지</h2>
            <div className="bg-blue-pastel/30 rounded-2xl p-8 mb-6">
              <p className="text-2xl font-bold text-gray-700">{recommendedTask}</p>
            </div>
            <button
              onClick={startTimer}
              className="w-full bg-green-pastel text-gray-700 py-4 rounded-xl text-xl font-bold"
            >
              25분 시작
            </button>
            <button
              onClick={() => setScreen('input')}
              className="w-full mt-3 text-gray-500 py-2"
            >
              다시 입력하기
            </button>
          </div>
        )}

        {screen === 'timer' && (
          <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
            <p className="text-lg text-gray-500 mb-2">{recommendedTask}</p>
            <div className="text-7xl font-bold text-gray-700 my-8">{formatTime(timer)}</div>
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={togglePause}
                className="bg-blue-pastel text-gray-700 px-8 py-3 rounded-full text-lg font-bold"
              >
                {isTimerRunning ? '일시정지' : '계속하기'}
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-500 mb-4">
              <button
                onClick={() => setNoisePlaying(!noisePlaying)}
                className={`px-4 py-2 rounded-full ${noisePlaying ? 'bg-green-pastel' : 'bg-gray-100'}`}
              >
                {noisePlaying ? '🔊 백색소음 ON' : '🔇 백색소음 OFF'}
              </button>
            </div>
            <button
              onClick={() => { setTimer(25 * 60); setIsTimerRunning(false); setScreen('recommend'); }}
              className="text-gray-400"
            >
              종료하기
            </button>
          </div>
        )}

        {screen === 'complete' && (
          <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">작업 완료!</h2>
            <p className="text-gray-500 mb-8">수고하셨습니다 ✨</p>
            <button
              onClick={resetAndGoHome}
              className="w-full bg-blue-pastel text-gray-700 py-4 rounded-xl text-xl font-bold mb-3"
            >
              다음 작업 추천 받기
            </button>
            <button
              onClick={() => setScreen('stress')}
              className="w-full bg-pink-pastel text-gray-700 py-3 rounded-xl text-lg font-bold mb-3"
            >
              😌 스트레스 해소
            </button>
            <button
              onClick={() => setScreen('activity')}
              className="w-full bg-green-pastel text-gray-700 py-3 rounded-xl text-lg font-bold"
            >
              🎲 랜덤 활동 추천
            </button>
          </div>
        )}

        {screen === 'stress' && (
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">😌 스트레스 해소</h2>
            
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-gray-700 mb-4">{stressTimer}초</div>
              
              <div className="w-full h-4 bg-gray-200 rounded-full mb-4 overflow-hidden">
                <div 
                  className="h-full bg-pink-pastel transition-all duration-1000"
                  style={{ width: `${(stressTimer / 60) * 100}%` }}
                />
              </div>
              
              {stressNotification && (
                <div className="bg-pink-pastel/30 rounded-xl p-4 mb-4">
                  <p className="text-gray-700 font-bold">{stressNotification}</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-center gap-3 mb-6">
              {!isStressTimerRunning && stressTimer === 60 && (
                <button
                  onClick={startStressTimer}
                  className="bg-pink-pastel text-gray-700 px-6 py-3 rounded-full text-lg font-bold"
                >
                  시작
                </button>
              )}
              {(isStressTimerRunning || stressTimer < 60) && (
                <>
                  <button
                    onClick={toggleStressPause}
                    className="bg-blue-pastel text-gray-700 px-6 py-3 rounded-full text-lg font-bold"
                  >
                    {isStressTimerRunning ? '일시정지' : '계속'}
                  </button>
                  <button
                    onClick={resetStressTimer}
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full text-lg font-bold"
                  >
                    초기화
                  </button>
                </>
              )}
            </div>
            
            {randomActivity && (
              <div className="bg-green-pastel/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-700 mb-3">✨ 추천 활동</h3>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{randomActivity.title}</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-bold">⏱️ 소요 시간:</span> {randomActivity.duration}</p>
                  <p><span className="font-bold">📊 난이도:</span> {randomActivity.difficulty}</p>
                  <p><span className="font-bold">💡 효과:</span> {randomActivity.effect}</p>
                  <p><span className="font-bold">🛠️ 준비물:</span> {randomActivity.preparation}</p>
                  <p className="mt-3 pt-3 border-t border-gray-200"><span className="font-bold">📝 방법:</span> {randomActivity.method}</p>
                </div>
              </div>
            )}
            
            <button
              onClick={() => setScreen('input')}
              className="w-full mt-6 text-gray-500"
            >
              ← 메인으로 돌아가기
            </button>
          </div>
        )}

        {screen === 'activity' && (
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">🎲 랜덤 활동 추천</h2>
            
            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              <button
                onClick={() => { setActivityCategory('all'); getRandomActivity('all'); }}
                className={`px-4 py-2 rounded-full text-sm font-bold ${activityCategory === 'all' ? 'bg-blue-pastel' : 'bg-gray-100'}`}
              >
                전체
              </button>
              <button
                onClick={() => { setActivityCategory('short'); getRandomActivity('short'); }}
                className={`px-4 py-2 rounded-full text-sm font-bold ${activityCategory === 'short' ? 'bg-green-pastel' : 'bg-gray-100'}`}
              >
                짧음 (5-15분)
              </button>
              <button
                onClick={() => { setActivityCategory('medium'); getRandomActivity('medium'); }}
                className={`px-4 py-2 rounded-full text-sm font-bold ${activityCategory === 'medium' ? 'bg-blue-pastel' : 'bg-gray-100'}`}
              >
                중간 (30분-1시간)
              </button>
              <button
                onClick={() => { setActivityCategory('long'); getRandomActivity('long'); }}
                className={`px-4 py-2 rounded-full text-sm font-bold ${activityCategory === 'long' ? 'bg-pink-pastel' : 'bg-gray-100'}`}
              >
                김 (1시간 이상)
              </button>
            </div>
            
            <button
              onClick={() => getRandomActivity(activityCategory)}
              className="w-full bg-green-pastel text-gray-700 py-4 rounded-xl text-xl font-bold mb-6"
            >
              🎲 랜덤 추천 받기
            </button>
            
            {randomActivity && (
              <div className="bg-blue-pastel/20 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-gray-800 mb-3">{randomActivity.title}</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-bold">⏱️ 소요 시간:</span> {randomActivity.duration}</p>
                  <p><span className="font-bold">📊 난이도:</span> {randomActivity.difficulty}</p>
                  <p><span className="font-bold">💡 효과:</span> {randomActivity.effect}</p>
                  <p><span className="font-bold">🛠️ 준비물:</span> {randomActivity.preparation}</p>
                  <p className="mt-3 pt-3 border-t border-gray-200"><span className="font-bold">📝 방법:</span> {randomActivity.method}</p>
                </div>
              </div>
            )}
            
            <button
              onClick={() => setScreen('input')}
              className="w-full mt-6 text-gray-500"
            >
              ← 메인으로 돌아가기
            </button>
          </div>
        )}

        {screen === 'game' && (
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <GameCanvas />
            {screen === 'game' && (
              <button
                onClick={() => setScreen('input')}
                className="w-full mt-4 text-gray-500"
              >
                ← 메인으로 돌아가기
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
