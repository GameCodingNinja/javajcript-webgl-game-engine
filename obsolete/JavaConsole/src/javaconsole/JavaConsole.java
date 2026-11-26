/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package javaconsole;

/**
 *
 * @author howie
 */
public class JavaConsole {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        
        long value = 0;
        long test;
        long maxValue = 10000000;
        long counter = 0;

        System.out.println("Test started...");

        long startTime = System.nanoTime();

        do
        {
            test = ++value;
            
            ++counter;

            do
            {
                if ((test & 1) == 0)
                    test /= 2;
                //if( (test % 2) == 0 )
                //    test /= 2;
                else
                    test = (test * 3) + 1;
                
                ++counter;
            }
            while (test > 1);
        }
        while ((test > 0) && (value < maxValue));

        System.out.println("Execution time: " + (((double)(System.nanoTime() - startTime) / 1000000.0)) + ", count: " + counter);
    }
}
