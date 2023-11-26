// C program to find the addition of elements or numbers present in the given big number using do while loop.

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int i, r, sum=0;
    printf("Enter the number do you want to add : \n");
    scanf("%d", &i);


    do
    {
        r = i%10;
        sum = sum + r;
        i = i/10;
        
    }while(i>0);

    printf("\nAddition of numbers in given number is : \n");
    printf("%d", sum);

    return 0;
}