// C program to print the table of 1 to 10 numbers using for loop

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int i,j;
    

    for(i=1;i<=10;i++)
    {
        for(j=1;j<=10;j++)
        {
            printf("%5d", i*j);
        }
        printf("\n");
    }
    return 0;
}