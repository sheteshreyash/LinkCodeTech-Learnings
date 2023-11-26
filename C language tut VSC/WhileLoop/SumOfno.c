// C program to add the elements or numbers in a continuous bigger number using while loop

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int i, r, sum=0;
    printf("Enter the number do you want to add : \n");
    scanf("%d", &i);


    while(i>0)
    {
        r = i%10;
        sum = sum + r;
        i = i/10;
    }i++;

    printf("\nAddition of numbers in given number is : \n");
    printf("%d", sum);

    return 0;
}