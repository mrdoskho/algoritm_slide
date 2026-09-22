total = 7384

hours = total // 3600

minuts = int(total % 3600 / 60)

secunds = total % 60

print(f"{hours}:{minuts}:{secunds}")