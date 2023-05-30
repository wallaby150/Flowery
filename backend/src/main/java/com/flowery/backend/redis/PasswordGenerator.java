package com.flowery.backend.redis;

import java.security.SecureRandom;

public class PasswordGenerator {
    private static final String CHAR_LOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String CHAR_UPPER = CHAR_LOWER.toUpperCase();
    private static final String NUMBER = "0123456789";
    private static final String OTHER_CHAR = "@#";

    private static final String PASSWORD_ALLOW_BASE = CHAR_LOWER + CHAR_UPPER + NUMBER + OTHER_CHAR;

    private static SecureRandom random = new SecureRandom();

    public static String generatePassword() {

        StringBuilder sb = new StringBuilder(8);

        String PASSWORD_ALLOW = shuffleString(PASSWORD_ALLOW_BASE);

        for (int i = 0; i < 8; i++) {
            int rndCharAt = random.nextInt(PASSWORD_ALLOW.length());
            char rndChar = PASSWORD_ALLOW.charAt(rndCharAt);
            sb.append(rndChar);
        }
        return sb.toString();
    }

    public static String shuffleString(String string) {
        char[] charArray = string.toCharArray();
        for (int i = charArray.length - 1; i > 0; i--) {
            int index = random.nextInt(i + 1);
            char tmp = charArray[index];
            charArray[index] = charArray[i];
            charArray[i] = tmp;
        }
        return new String(charArray);
    }


}