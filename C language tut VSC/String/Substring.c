// Enter any string and find the substring of the main string in the given program

#include <stdio.h>
#include <stdlib.h>

int main()
{
    char name[30];
    int i, sp, nc, cnt=0;

    printf("Enter any name : \n");
    scanf("%s", name);

    printf("\nEnter the starting location and no. of characters to print : \n");
    scanf("%d%d", &sp, &nc);

    printf("\nUpdated String is : \n");
    for(i=sp-1;cnt<nc;i++,cnt++) //cnt=4<4 i=7
    {
        printf("%c", name[i]);
    }
    return 0;
}