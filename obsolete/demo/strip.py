# How to execute from command prompt: python strip.py

import os

# First Pass

# Strip out all the multi-line and single line comments
stripFile = open("bundle_strip.js", "w")
with open("bundle.js", "r") as ins:
    
    multiLineComment = False
    for line in ins:

        lastChar = ''
        newLine = ''

        for char in line:

            # Check for multi-line comments
            if lastChar == '/' and char == '*' and not multiLineComment:
                multiLineComment = True
                newLine = newLine[:-1] # Remove the last character which is a /

            # Check for single line comments
            if lastChar == '/' and char == '/' and not multiLineComment:
                newLine = newLine[:-1]
                newLine += '\n'
                break

            # If not multi-line, then copy character
            if not multiLineComment:
                newLine += char

            # Check for end of multi-line comment
            if lastChar == '*' and char == '/' and multiLineComment:
                multiLineComment = False

            lastChar = char

        if newLine != '':
            stripFile.write(newLine)

    stripFile.close()


# Second Pass

# Strip out all starting spaces, tabs and single line returns
stripFile = open("bundle.js", "w")
with open("bundle_strip.js", "r") as ins:

    newLine = ''

    for line in ins:

	    # Remove starting spaces
        lineCheck = ''
        spaceFound = True
        for char in line:
	    
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

        # Remove line with just returns on them
        if newLine != '' and newLine[0] == '\n':
            continue;

        if newLine != '':
            stripFile.write(newLine)

    stripFile.close()
    os.remove("bundle_strip.js")


# Third Pass

# Strip out all spaces that can safely be removed
#stripFile = open("bundle_strip3.js", "w")
#with open("bundle_strip2.js", "r") as ins:

#    newLine = ''

#    for line in ins:

#        newLine = ''
#        lastChar = ''
#        quoteString = False
#        pauseStrip = False
        
        # Remove spaces after...
#        for char in line:

#            if quoteString == True:

#            if not pauseStrip:
#                if (char == ' ' and
#                        (lastChar == '[' or
#                        lastChar == ';' or
#                        lastChar == ',' or
#                        lastChar == '(' or
#                        lastChar == ')' or
#                        lastChar == ' ' or
#                        lastChar == '{' or
#                        lastChar == '<' or
#                        lastChar == '>' or
#                        lastChar == '*' or
#                        lastChar == '-' or
#                        lastChar == '/' or
#                        lastChar == '|' or
#                        lastChar == '=' or
#                        lastChar == '+')):
#                    pass

                # Remove spaces before...
#                elif (lastChar == ' ' and
#                        (char == ']' or
#                        char == ')' or
#                        char == '}' or
#                        char == '<' or
#                        char == '>' or
#                        char == '*' or
#                        char == '-' or
#                        char == '/' or
#                        char == '|' or
#                        char == '!' or
#                        char == '=' or
#                        char == '+')):
#                    newLine = newLine[:-1]
#                    newLine += char

#                else:
#                    newLine += char

#            else:
#                newLine += char

            # Save the last character
#            lastChar = char

#        if newLine != '':
#            stripFile.write(newLine)

#    stripFile.close()

    #os.remove("bundle_strip.js")


