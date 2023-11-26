/* C program to print the output like  A          using for loop
                                       B B
                                       C C C
                                       D D D D 
                                       E E E E E */


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
    return 0;
}