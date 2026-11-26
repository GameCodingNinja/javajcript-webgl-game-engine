# How to execute from command prompt: python strip.py

import os

# Remove all the multi-line comments
stripFile = open("bundle_strip.js", "w")
with open("bundle.js", "r") as ins:
    
    multiLineComment = False
    for line in ins:

        lastChar = ''
        newLine = ''

        for char in line:

            if lastChar == '/' and char == '*' and not multiLineComment:
                multiLineComment = True
                newLine = newLine[:-1] # Remove the last character which is a /

            if not multiLineComment:
                newLine += char

            if lastChar == '*' and char == '/' and multiLineComment:
                multiLineComment = False

            lastChar = char

        if newLine != '':
            stripFile.write(newLine)

    stripFile.close()


stripFile = open("bundle.js", "w")
with open("bundle_strip.js", "r") as ins:

    newLine = ''

    for line in ins:

        # Remove and single line quotes
        lineCheck = ''
        lastChar = ''
        for char in line:

            if lastChar == '/' and char == '/':
                lineCheck = lineCheck[:-1]
                break

            # Add the character to the new line
            lineCheck += char

            # Save the last character
            lastChar = char

        newLine = lineCheck

	    # Remove starting spaces
        lineCheck = ''
        spaceFound = True
        for char in newLine:
	    
            if char == ' ' and spaceFound:
                pass
            else:
                lineCheck += char
                spaceFound = False

	    newLine = lineCheck

        # Remove starting tabs
        lineCheck = ''
        tabFound = True
        for char in newLine:

            if char == '\t' and tabFound:
                pass
            else:
                lineCheck += char
                tabFound = False

        newLine = lineCheck

        # Remove spaces after...
        lineCheck = ''
        lastChar = ''
        for char in newLine:

            if (char == ' ' and
                    (lastChar == '[' or
                    lastChar == ';' or
                    lastChar == ',' or
                    lastChar == '(' or
                    lastChar == ')' or
                    lastChar == ' ' or
                    lastChar == '{' or
                    lastChar == '<' or
                    lastChar == '>' or
                    lastChar == '*' or
                    lastChar == '-' or
                    lastChar == '/' or
                    lastChar == '|' or
                    lastChar == '=' or
                    lastChar == '+')):
                pass
            else:
                lineCheck += char

            # Save the last character
            lastChar = char

        newLine = lineCheck

        # Remove spaces before...
        lineCheck = ''
        lastChar = ''
        for char in newLine:

            if (lastChar == ' ' and
                    (char == ']' or
                    char == ')' or
                    char == '}' or
                    char == '<' or
                    char == '>' or
                    char == '*' or
                    char == '-' or
                    char == '/' or
                    char == '|' or
                    char == '!' or
                    char == '=' or
                    char == '+')):
                lineCheck = lineCheck[:-1]

            lineCheck += char

            # Save the last character
            lastChar = char

        newLine = lineCheck

        # Remove return after... don't use ')', '}' or ',' may cause problems
        lineCheck = ''
        lastChar = ''
        for char in newLine:

            if char == '\n' and (lastChar == '{'or lastChar == ';'):
                pass
            else:
                lineCheck += char

            # Save the last character
            lastChar = char

        newLine = lineCheck

        # Remove line with just returns on them
        if newLine != '' and newLine[0] == '\n':
            continue;

        if newLine != '':
            stripFile.write(newLine)

    stripFile.close()

    os.remove("bundle_strip.js")

