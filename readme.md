Client (message request)
      │
      ▼
app.ts
      │
      ▼
Message Routes
      │
      ▼
Middleware (DTO 驗證)   ← DTO #1 共兩次，第二次驗證從 kafka 拉下來的訊息。確保在分散式系統中，其他伺服器的 DTO 驗證不會版本不一樣，疏漏了某些檢查。 
驗證成本低，會值得
      │
      ▼
Controller ( 處理 request reponse )
      │
      ▼
producer Service  把訊息傳給 kafka 放進貯列 
      │
      ▼
Kafka Producer.send(message)

_________________________________________________________________

另一個 thread ( consumer )

Kafka Topic
      │
      ▼
Consumer Service  (直接從 Kafka pull)
      │
      ▼
DTO 驗證 / Schema 驗證   ← DTO #2
Kafka 不經由 HTTP routes 或 middleware，所以不能靠上面 pipeline 做驗證。
Consumer 得自己在 Service 層或專門的 validator function 做 DTO 驗證。
可用 class-validator / Zod / Joi 等工具
      │
      ▼
Consumer Service 處理業務邏輯
