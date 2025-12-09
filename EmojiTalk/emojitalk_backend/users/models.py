from django.db import models

# No custom user model needed; we will use Django's default User model

class Feedback(models.Model):
    feature = models.CharField(max_length=255)
    comments = models.TextField()
    rating = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.feature} - {self.rating}"
    


