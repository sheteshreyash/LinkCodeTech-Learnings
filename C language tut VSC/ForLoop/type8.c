/* C program to show the output like    1         using for loop.
                                        2 3
                                        4 5 6
                                        7 8 9 10       */

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int i,j;
    int ch = 1;

    for(i=1;i<=5;i++)
    {
        for(j=1;j<=i;j++)
        {
            printf("%5d", ch);
            ch++;
            
        }
        
        printf("\n");
    }
    return 0;
}