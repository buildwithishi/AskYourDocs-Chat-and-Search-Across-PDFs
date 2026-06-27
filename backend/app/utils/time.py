from datetime import datetime, timezone


def humanize_relative(dt: datetime) -> str:
    now = datetime.now(timezone.utc)
    seconds = (now - dt).total_seconds()

    if seconds < 60:
        return "Just now"
    if seconds < 3600:
        minutes = int(seconds // 60)
        return f"{minutes} minute{'s' if minutes != 1 else ''} ago"
    if seconds < 86400:
        hours = int(seconds // 3600)
        return f"{hours} hour{'s' if hours != 1 else ''} ago"

    days = int(seconds // 86400)
    if days == 1:
        return "Yesterday"
    return f"{days} days ago"
