def eur_to_bgn(amount_in_eur, exchange_rate=1.9536):
    if amount_in_eur < 0:
        raise ValueError("Amount must be a non-negative number")

    if exchange_rate <= 0:
        raise ValueError("Invalid exchange rate")

    amount_in_bgn = amount_in_eur * exchange_rate
    return amount_in_bgn


def bgn_to_eur(amount_in_bgn, exchange_rate=0.5117):
    if amount_in_bgn < 0:
        raise ValueError("Amount must be a non-negative number")

    if exchange_rate <= 0:
        raise ValueError("Exchange rate must be a positive number")

    amount_in_eur = amount_in_bgn / exchange_rate
    return amount_in_eur
