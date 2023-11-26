/* C program to print the output like   A       using for loop 
                                        B C
                                        D E F 
                                        G H I J               */

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int i,j;
    int ch = 65;

    for(i=1;i<=7;i++)
    {
        for(j=1;j<=i;j++)
        {
            printf("%5c", ch);
            ch++;
            if((ch>90) || (ch==44))
            {
                ch = 43;
            }
        }
        
        printf("\n");
    }
    return 0;
}