// Find area of rectangle using functions in c

#include <stdio.h>
#include <stdlib.h>

void rectangleArea();
int main()
{
    rectangleArea();
    return 0;
}

void rectangleArea()
{
    int l, b, area;
    printf("Enter Length and breadth of the rectangle : \n");
    scanf("%d%d", &l, &b);

    area = l*b;  
    printf("\nArea of rectangle is : %d", area);

}