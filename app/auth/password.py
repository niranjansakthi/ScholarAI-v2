import bcrypt

def hash_password(password: str) -> str:
    # Hash a password for the first time
    # bcrypt.hashpw requires bytes, so we encode the password
    # It returns bytes, so we decode to store as string
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Check hashed password. Using bcrypt, the salt is saved into the hash itself
    return bcrypt.checkpw(
        plain_password.encode('utf-8'), 
        hashed_password.encode('utf-8')
    )