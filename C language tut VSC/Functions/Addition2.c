// Function with argument and without return type
void adddata(int, int);

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int a,b, sum;
    printf("Enter the numbers do you want to add : \n");
    scanf("%d%d", &a, &b);
    adddata(a, b);
    return 0;
}
void adddata(int a, int b)
{   int sum;
    sum = a + b;
    printf("Addition of %d and %d is %d", a, b, sum);
}