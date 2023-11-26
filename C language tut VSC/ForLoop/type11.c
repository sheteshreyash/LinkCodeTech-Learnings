/* C program to show the output like  A         using for loop.
                                      B B
                                      C C C
                                      D D D D 
                                      E E E E E 
                                      D D D D 
                                      C C C 
                                      B B
                                      A              */

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int i,j;
    int ch = 65;

    for(i=1;i<=5;i++)
    {
        for(j=1;j<=i;j++)
        {
            printf("%5c", ch);
            
        }
        ch++;
        printf("\n");
    }
    ch = 68;
    for(i=4;i>=1;i--)
    {
        for(j=1;j<=i;j++)
        {
            printf("%5c", ch);
        }
        ch--;
        printf("\n");
    }
    return 0;
}  