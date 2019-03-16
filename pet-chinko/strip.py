# How to execute from command prompt: python strip.py

stripFile = open("bundle_strip.js", "w")
with open("bundle.js", "r") as ins:
    comment = False
    for line in ins:
        newLine = ''
        beforeLast = ''
        lastChar = ''
        code = False
        for char in line:

            if lastChar == '/' and char == '*' and not comment:
                comment = True
                code = False
                newLine = newLine[:-1] # Remove the last character which is a /

            if not comment:

                if lastChar == '/' and char == '/':
                    newLine = newLine[:-1] # Remove the last character which is a /
                    #if newLine != '':
                    #    newLine += '\n'

                    break

                if char == '\n' and newLine == '':
                    break;
                
                #if beforeLast != '}' and lastChar == '}' and (char == '\n'):
                #    break;
                    
                if ((lastChar == '[') or (lastChar == '*') or (lastChar == '/') or (lastChar == '+') or (lastChar == '-') or (lastChar == ',') or (lastChar == '!') or (lastChar == '<') or (lastChar == '>') or (lastChar == '{') or (lastChar == ' ') or (lastChar == '=') or (lastChar == '(') or (lastChar == ')') or (lastChar == ':') or (lastChar == ';')) and char == ' ':
                    continue;
                    
                if lastChar == ' ' and ((char == '|') or (char == ']') or (char == '*') or (char == '/') or (char == '-') or (char == '+') or (char == '!') or (char == '<') or (char == '>') or (char == ',') or (char == '{') or (char == ' ') or (char == '=') or (char == '(') or (char == ')') or (char == ':') or (char == ';') or (char == '!')):
                    newLine = newLine[:-1]

                if ((lastChar == '{') or (lastChar == ';') or (lastChar == ',')) and char == '\n':
                    break;

                if (char == ' ') and code:
                    newLine += char

                if not (char == ' ' or char == '\t'):
                    code = True
                    newLine += char

            if lastChar == '*' and char == '/':
                comment = False
                code = False

            beforeLast = lastChar
            lastChar = char

        if newLine != '':
            stripFile.write(newLine)

stripFile.close()
