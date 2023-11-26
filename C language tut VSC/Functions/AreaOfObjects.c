// Find the area of circle using (without argument without return type function), Find the area of triangle using (with argument and without return type functions) and area of rectangle using (without argument and with return type function.)

#include <stdio.h>
#include <stdlib.h>

void circleArea(float);
float triangleArea(float);
float rectArea(float);

int main()
{
    int ch, r, area;
    int c;

    do
    {
        printf("1 - Area of Circle\n2 - Area of Triangle\n3 - Area of Rectangle");
        printf("\nEnter your choice : ");
        scanf("%d", &ch);

        switch(ch)
        {
            case 1 :
            circleArea(float aofcircle);
            break;
            
            
            case 2 :
            
            
            break;
            
            
            case 3 : 
            
            
            break;
        }

    }while(ch==1);
    return 0;
}


void circleArea(float aofcircle)
{
    float r, aofcircle;
    printf("\nEnter the Radius of the circle : \n");
    scanf("%f", &r);

    aofcircle = 3.14*r*r;
    printf("Area of the circle is : %f", aofcircle);
}

float triangleArea()
{

}

float rectArea()
{

}