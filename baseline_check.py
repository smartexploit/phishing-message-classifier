from src.predict import classify_message


messages = [
    (
        "English scam",
        "URGENT! Your bank account has been suspended. "
        "Send your OTP immediately to avoid losing access."
    ),
    (
        "English legitimate",
        "Your order has been shipped and will arrive tomorrow. "
        "Thank you for shopping with us."
    ),
    (
        "Yoruba scam",
        "Banki rẹ ti dina. Jọwọ fi OTP rẹ ranṣẹ bayi lati ṣii akọọlẹ rẹ."
    ),
    (
        "Hausa scam",
        "An dakatar da asusun bankin ku. "
        "Aiko da OTP dinka yanzu don tabbatar da asusun ku."
    ),
    (
        "Igbo scam",
        "Akaụntụ ụlọ akụ gị akwụsịla. "
        "Ziga OTP gị ugbu a iji kwado akaụntụ gị."
    ),
    (
        "Nigerian English scam",
        "Congratulations! You have won ₦500,000. "
        "Send your ATM PIN and OTP to claim your prize."
    ),
]


for name, message in messages:
    print("=" * 80)
    print(name)
    print("Message:", message)

    try:
        result = classify_message(message)
        print("Prediction:", result["label"])
        print("Spam probability:", result["spam_probability"])
    except Exception as error:
        print("ERROR:", error)