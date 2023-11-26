/* C program to print the output like  *       in the pattern using for loop
                                       **
                                       ***
                                       ****
                                       *****   */

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int i,j;
    

    for(i=1;i<=10;i++)
    {
        for(j=1;j<=i;j++)
        {
            printf("*");
        }
        printf("\n");
    }
    return 0;
}