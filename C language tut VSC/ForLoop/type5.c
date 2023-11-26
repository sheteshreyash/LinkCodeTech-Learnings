// C program to print the decreasing order of the rows using for loop

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int i,j;
    

    for(i=5;i>=1;i--)
    {
        for(j=1;j<=i;j++)
        {
            printf("%5d", i);
        }
        printf("\n");
    }
    return 0;
}