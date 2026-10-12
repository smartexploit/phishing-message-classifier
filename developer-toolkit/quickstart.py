from scamshield_client import ScamShieldClient


def main():
    message = input("Enter a message to check: ")

    with ScamShieldClient() as client:
        print("\nMachine-learning result:")
        try:
            print(client.predict(message))
        except Exception as exc:
            print(f"Prediction request failed: {exc}")

        print("\nN-ATLaS semantic analysis:")
        try:
            print(client.analyze(message))
        except Exception as exc:
            print(f"Analysis request failed: {exc}")


if __name__ == "__main__":
    main()
